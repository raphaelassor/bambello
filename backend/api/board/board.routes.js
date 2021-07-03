const express = require('express')
const { requireAuth, requireAdmin } = require('../../middlewares/requireAuth.middleware')
const { log } = require('../../middlewares/logger.middleware')
const { getBoards, getBoard, addBoard, updateBoard, deleteBoard } = require('./board.controller')
const router = express.Router()

router.get('/', log, getBoards)
router.get('/:id', log, getBoard)
router.post('/', log, addBoard)
router.put('/:id', log, updateBoard)
router.delete('/:id', log, deleteBoard)

module.exports = router