import { utilsService } from './utils.service'
import { httpService } from './http.service'
import { userService } from './user.service'

export const boardService = {
    query,
    remove,
    getById,
    save,
    updateCardInBoard,
    createActivity,
    setPopoverPos,
    removeCard,
    getFilteredList,
}

async function query(filterBy = { ctg: '' }) {
    try {
        return await httpService.get('board', filterBy)
    } catch (err) {
        throw err
    }
}

async function remove(boardId) {
    try {
        await httpService.delete(`board/${boardId}`)
    } catch (err) {
        throw err
    }
}

async function getById(boardId) {
    try {
        return await httpService.get(`board/${boardId}`)

    } catch (err) {
        throw err
    }
}

async function save(board) {
    if (board._id) {
        try {
            return await httpService.put(`board/${board._id}`, board)
        } catch (err) {
            throw err
        }
    } else {
        try {
            return await httpService.post('board', board)
        } catch (err) {
            throw err
        }
    }
}

// sync functions 

export function updateCardInBoard(board, updatedCard) {
    board.lists.forEach(list => {
        list.cards.forEach((card, idx) => {
            if (card.id === updatedCard.id) list.cards[idx] = updatedCard
        })
    })
    return { ...board }
}

export function createActivity(actionType, txt = '', card = null) {

    const loggedInUser = userService.getLoggedinUser()

    const { _id, fullname, imgUrl } = loggedInUser

    const byMember = {
        _id,
        fullname,
        imgUrl
    }

    let savedCard
    if (card) {
        savedCard = {
            id: card.id,
            title: card.title,
            members: card.members
        }
    }

    const savedActivity = {
        id: utilsService.makeId(),
        actionType,
        txt,
        createdAt: Date.now(),
        byMember,
        card: savedCard || null,
    }
    return savedActivity
}

function getFilteredList(listToFilter, filter) {
    const list = JSON.parse(JSON.stringify(listToFilter))

    list.cards = list.cards.filter(card => {
        let isInLabels = true;
        let isInMembers = true;
        if (filter.labels.length) {
            isInLabels = filter.labels.some(label => card.labelIds.some(labelId => labelId === label.id))

        }
        if (filter.members.length) {
            isInMembers = filter.members.some(memberFilter => card.members.some(member => memberFilter._id === member._id))
        }
        const regex = new RegExp(filter.txt, 'i')

        return !card.isArchived && isInMembers && isInLabels && regex.test(card.title)
    })
    return list
}

function setPopoverPos(pos, elRect, diff = 38) {
    let { left, top } = pos
    top += diff
    const { height, width } = elRect
    const viewportWidth = window.innerWidth
    const viewportHeight = window.innerHeight
    if (left + width > viewportWidth) left = viewportWidth - width - 10
    if (top + height > viewportHeight) top = viewportHeight - height - 10
    return { left, top, width }
}

function removeCard(board, card) {
    board.lists.forEach(list => {
        if (list.cards.some(boardCard => boardCard.id === card.id))
            list.cards = list.cards.filter(boardCard => boardCard.id !== card.id)
    })
    return { ...board }
}
