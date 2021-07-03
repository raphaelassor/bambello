
const dbService = require('../../services/db.service')
const logger = require('../../services/logger.service')
const ObjectId = require('mongodb').ObjectId

async function query(filterBy = { ctg: '' }) {
    const criteria = _buildCriteria(filterBy)
    try {
        const collection = await dbService.getCollection('board')
        const boards = await collection.find(criteria).toArray()
        return boards
    } catch (err) {
        logger.error('cannot find boards', err)
        throw err
    }
}

async function save(board) {
    const { title, createdBy, style, labels, members, lists, activities, isFavorite } = board
    let savedBoard
    if (board._id) {
        //UPDATE
        try {
            savedBoard = {
                _id: ObjectId(board._id),
                title,
                createdBy,
                style,
                labels,
                members,
                lists,
                activities: activities.slice(0, 20),
                isFavorite
            }
            const collection = await dbService.getCollection('board')
            await collection.updateOne({ _id: savedBoard._id }, { $set: savedBoard })
            return savedBoard


        } catch (err) {
            logger.error('cannot update board', err)
            throw err
        }
    } else {
        // CREATE
        try {
            savedBoard = {
                createdAt: ObjectId(board._id).getTimestamp(),
                title: board.title,
                createdBy: board.createdBy,
                style: {
                    background: board.background
                },
                labels: [],
                members: [board.createdBy],
                lists: [],
                activities: [],
                isFavorite: false
            }
            const collection = await dbService.getCollection('board')
            await collection.insertOne(savedBoard)
            return savedBoard
        } catch (err) {
            logger.error('cannot add board', err)
            throw err
        }
    }
}

async function getById(boardId) {
    try {
        const collection = await dbService.getCollection('board')
        const board = await collection.findOne({ '_id': ObjectId(boardId) })
        return board
    } catch (err) {
        logger.error(`while finding board ${boardId}`, err)
        throw err
    }
}

async function remove(boardId) {
    try {
        const collection = await dbService.getCollection('board')
        await collection.deleteOne({ '_id': ObjectId(boardId) })
    } catch (err) {
        logger.error(`cannot remove board ${boardId}`, err)
        throw err
    }
}

function _buildCriteria(filterBy) {
    const criteria = {}
    const { ctg } = filterBy
    if (ctg === 'favorite') {
        criteria.isFavorite = { $eq: true }
    }
    return criteria
}

module.exports = {
    query,
    save,
    getById,
    remove
}