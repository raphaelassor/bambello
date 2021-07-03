const cookieParser = require('cookie-parser')
const express = require('express')
const cors = require('cors')
const path = require('path')
const expressSession = require('express-session')
const app = express()
const http = require('http').createServer(app)


const session = expressSession({
    secret: '512gs2154%$!^@gs9',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
})

app.use(session)

// Config Express Application
app.use(express.static('public'))
app.use(express.json({ limit: '50mb' }))
app.use(cookieParser())


if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.resolve(__dirname, 'public')))
    app.use((req, res, next) => {
        if (req.header('x-forwarded-proto') !== 'https')
            res.redirect(`https://${req.header('host')}${req.url}`)
        else
            next()
    })
} else {
    const corsOptions = {
        origin: ['http://127.0.0.1:8080', 'http://localhost:8080', 'http://127.0.0.1:3000', 'http://localhost:3000'],
        credentials: true
    }
    app.use(cors(corsOptions))
}

// ROUTES REQ
const authRoutes = require('./api/auth/auth.routes')
const userRoutes = require('./api/user/user.routes')
const boardRoutes = require('./api/board/board.routes')
const { connectSockets } = require('./services/socket.service')

// routes
const setupAsyncLocalStorage = require('./middlewares/setupAls.middleware')
app.all('*', setupAsyncLocalStorage)

// TODO: check with app.use
app.get('/api/setup-session', (req, res) => {
    req.session.connectedAt = Date.now()
    console.log('setup-session:', req.sessionID);
    res.end()
})

// USING ROUTES
app.use('/api/auth', authRoutes)
app.use('/api/user', userRoutes)
app.use('/api/board', boardRoutes)
connectSockets(http, session)

// Make every server-side-route to match the index.html
// so when requesting http://localhost:3030/index.html/car/123 it will still respond with
// our SPA (single page app) (the index.html file) and allow vue/react-router to take it from there
app.get('/**', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'))
})

const logger = require('./services/logger.service')
const port = process.env.PORT || 3030
http.listen(port, () => {
    logger.info('Server is running on port: ' + port)
})