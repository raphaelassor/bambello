const asyncLocalStorage = require('./als.service');
const logger = require('./logger.service');
const utilsService = require('./utils.service')
var gIo = null
var gSocketBySessionIdMap = {}
function connectSockets(http, session) {
    gIo = require('socket.io')(http);
    const sharedSession = require('express-socket.io-session');
    gIo.use(sharedSession(session, {
        autoSave: true
    }))
    gIo.on('connection', socket => {
        console.log('New socket - socket.handshake.sessionID', socket.handshake.sessionID)
        gSocketBySessionIdMap[socket.handshake.sessionID] = socket
        // if (socket.handshake?.session?.user) socket.join(socket.handshake.session.user._id)
        socket.on('disconnect', () => {
            // console.log('Someone disconnected')
            console.log(socket.userId, 'Has disconnected')
            if (socket.handshake) {
                gSocketBySessionIdMap[socket.handshake.sessionID] = null
            }
        })
        socket.on('user endSession',userId=>{
            if(userId) gIo.emit('user disconnected',userId)
        })

        
        socket.on('user logout', userId => {
            gIo.emit('user disconnected', userId)
        })
        // join to new board
        socket.on('join board', boardId => {
            if (socket.boardId === boardId) return
            if (socket.boardId) {
                socket.leave(socket.boardId)
            }
            socket.join(boardId)
            // logger.debug('Session  ID is', socket.handshake.sessionID)
            socket.boardId = boardId
        })
        socket.on('user-watch', userId => {
            //for notifications
            socket.join(userId)
            //for login
            socket.userId = userId
            gIo.emit('user connected', userId)
            // gIo.to(socket.userId).emit('user connected', userId)
        })

        socket.on('app newActivity', activity => {
            if (activity.card.members) {
                console.log('app activty', activity)
                activity.card.members.forEach(member => {
                    console.log('members in card activity:', member)
                    if (member._id !== activity.byMember._id) gIo.to(member._id).emit('app addActivity', activity)
                })
            }
        })

        socket.on('board newUpdate', savedBoard => {
            console.log('board update ', socket.boardId)
            socket.to(socket.boardId).emit('board updated', savedBoard)
        })
         // socket.on('card comments', cardId => {
        //     if (socket.cardId === cardId) return
        //     if (socket.cardId) {
        //         socket.leave(socket.cardId)
        //     }
        //     socket.join(cardId)
        //     logger.debug('Session ID is', socket.handshake.sessionID)
        //     socket.cardId = cardId
        // })
    })
}
function emitToAll({ type, data, room = null }) {
    if (room) gIo.to(room).emit(type, data)
    else gIo.emit(type, data)
}

// TODO: Need to test emitToUser feature
function emitToUser({ type, data, userId }) {
    gIo.to(userId).emit(type, data)
}
// Send to all sockets BUT not the current socket
function broadcast({ type, data, room = null }) {
    const store = asyncLocalStorage.getStore()
    const { sessionId } = store
    if (!sessionId) return logger.debug('Shoudnt happen, no sessionId in asyncLocalStorage store')
    const excludedSocket = gSocketBySessionIdMap[sessionId]
    if (!excludedSocket) return logger.debug('Shouldnt happen, No socket in map')
    if (room) excludedSocket.broadcast.to(room).emit(type, data)
    else excludedSocket.broadcast.emit(type, data)
}
module.exports = {
    connectSockets,
    emitToAll,
    broadcast,
}