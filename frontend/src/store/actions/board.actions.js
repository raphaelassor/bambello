
import { boardService } from '../../services/board.service'
import { socketService } from '../../services/socket.service'

export function loadBoards(filterBy = { ctg: '' }) {
    return async dispatch => {
        try {
            dispatch({ type: 'SET_LOADING' })
            const boards = await boardService.query(filterBy)
            dispatch({ type: 'SET_BOARDS', boards })
        } catch (err) {
            console.log('BoardActions: err in loadBoards', err)
        }
    }
}

export function loadBoard(boardId) {
    return async dispatch => {
        try {
            const board = await boardService.getById(boardId)
            dispatch({ type: 'SET_BOARD', board })
        } catch (err) {
            console.log('BoardActions: err in loadBoard', err)
        }
    }
}

export function onSaveBoard(board) {
    return async dispatch => {
        try {
            const savedBoard = await boardService.save(board)
            dispatch({ type: 'SAVE_BOARD', board: savedBoard })
            socketService.emit('board newUpdate', savedBoard)
        } catch (err) {
            console.log('BoardActions: err in onSaveBoard', err)
        }
    }
}
export function createBoard(board) {
    return async dispatch => {
        try {
            const savedBoard = await boardService.save(board)
            dispatch({ type: 'SET_BOARD', board: savedBoard })
        } catch (err) {
            console.log('BoardActions: err in onSaveBoard', err)
        }
    }
}
export function unsetBoard() {
    return dispatch => {
        dispatch({ type: 'SET_BOARD', board: null })
    }
}

export function togglePreviewLabels() {
    return dispatch => {
        dispatch({ type: 'TOGGLE_LABELS' })
    }
}

export function setPreviewLabelClassName(className) {
    return dispatch => {
        dispatch({ type: 'SET_LABELS_CLASSNAME', className })
    }
}

export function setFilter(filterBy) {
    return dispatch => {
        dispatch({ type: 'SET_FILTER', filterBy })
    }
}








