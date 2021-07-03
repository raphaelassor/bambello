import { Component } from 'react'
import { connect } from 'react-redux'
import { Route } from 'react-router-dom'
import { loadBoard, onSaveBoard, unsetBoard } from '../store/actions/board.actions'
import { onLogin } from '../store/actions/app.actions'
import { closePopover } from '../store/actions/app.actions'
import { Loader } from '../cmps/Loader'
import { CardEdit } from '../cmps/CardEdit'
import { CardDetails } from './CardDetails'
import { CardList } from '../cmps/CardList'
import { CardListAdd } from '../cmps/CardListAdd'
import { BoardHeader } from '../cmps/BoardHeader'
import { DragDropContext, Droppable } from 'react-beautiful-dnd'
import { eventBusService } from '../services/event-bus.service'
import { boardService } from '../services/board.service'
import { socketService } from '../services/socket.service'
import { Dashboard } from './Dashboard'



class _BoardApp extends Component {
    state = {
        isCardEditOpen: false,
        currCard: null,
        elPos: null
    }

    removeEvent;

    async componentDidMount() {
        try {
            if (!this.props.loggedInUser) this.props.onLogin()
            const { boardId } = this.props.match.params
            await this.props.loadBoard(boardId)
            const { board } = this.props
            socketService.emit('join board', board._id)
            socketService.on('board updated', savedBoard => {
                this.props.loadBoard(savedBoard._id)
            })
            this.removeEvent = eventBusService.on('card-edit', ({ elPos, card }) => {
                this.setState({ isCardEditOpen: true, currCard: card, elPos })
            });
        } catch (err) {
            console.log(err)
        }
    }
    async componentDidUpdate(prevProps) {
        const { boardId } = this.props.match.params
        const { loadBoard, closePopover } = this.props
        if (prevProps.match.params.boardId !== boardId) {
            closePopover()
            await loadBoard(boardId)
            socketService.emit('join board', boardId)
        }
    }

    componentWillUnmount() {
        socketService.off('board updated')
        if (this.removeEvent) {
            this.removeEvent()
        }
        closePopover()
        this.props.unsetBoard()
    }

    onCloseCardEdit = () => {
        this.setState({ isCardEditOpen: false })
    }

    onDragEnd = (result) => {
        let { board, board: { lists }, onSaveBoard } = this.props
        const { destination, source, type } = result
        if (!destination) return
        const droppableIdStart = source.droppableId
        const droppableIdEnd = destination.droppableId
        const droppableIdxStart = source.index
        const droppableIdxEnd = destination.index

        // dragging lists around
        if (type === 'list') {
            const list = lists.splice(droppableIdxStart, 1)
            lists.splice(droppableIdxEnd, 0, ...list)
            board.lists = lists
            onSaveBoard(board)
            return
        }

        // in the same list
        if (droppableIdStart === droppableIdEnd) {
            const list = lists.find(list => list.id === droppableIdStart)
            const card = list.cards.splice(droppableIdxStart, 1)
            list.cards.splice(droppableIdxEnd, 0, ...card)
            const listIdx = lists.indexOf(list)
            lists[listIdx] = list
        }

        // other list 
        if (droppableIdStart !== droppableIdEnd) {
            const listStart = lists.find(list => list.id === droppableIdStart)
            const card = listStart.cards.splice(droppableIdxStart, 1)
            const listEnd = lists.find(list => list.id === droppableIdEnd)
            listEnd.cards.splice(droppableIdxEnd, 0, ...card)
            const listStartIdx = lists.indexOf(listStart)
            const listEndIdx = lists.indexOf(listEnd)
            lists[listStartIdx] = listStart
            lists[listEndIdx] = listEnd
            const txt = `${listStart.title} to ${listEnd.title}`
            const savedActivity = boardService.createActivity('moved', txt, ...card)
            board.activities.unshift(savedActivity)
        }
        board.lists = lists
        onSaveBoard(board)
    }


    render() {
        const { onSaveBoard, board, filterBy } = this.props
        const { currCard, elPos, isCardEditOpen } = this.state
        if (!board) return <Loader />

        return (
            <>
                <DragDropContext onDragEnd={this.onDragEnd}>
                    <section className="board-app flex column">
                        <BoardHeader board={board} onSaveBoard={onSaveBoard} />
                        <Route path="/board/:boardId/:listId/:cardId" component={CardDetails} />
                        <Route path="/board/:boardId/dashboard" component={Dashboard} />
                        <Droppable droppableId="all-lists" direction="horizontal" type="list">
                            {provided => (
                                <div {...provided.droppableProps} ref={provided.innerRef} className="card-list-container flex">
                                    {board.lists.map((currList, idx) => <CardList filterBy={filterBy} key={currList.id} currListIdx={idx} currList={currList} onSaveBoard={onSaveBoard} board={board} />)}
                                    {provided.placeholder}
                                    <CardListAdd board={board} onSaveBoard={onSaveBoard} />
                                </div>
                            )}
                        </Droppable>
                    </section>
                </DragDropContext>
                {isCardEditOpen && <CardEdit board={board} card={currCard} elPos={elPos} onCloseCardEdit={this.onCloseCardEdit} />}
            </>
        )
    }
}

function mapStateToProps(state) {
    return {
        board: state.boardModule.board,
        isLoading: state.boardModule.isLoading,
        loggedInUser: state.appModule.loggedInUser,
        filterBy: state.boardModule.filterBy
    }
}

const mapDispatchToProps = {
    loadBoard,
    onSaveBoard,
    unsetBoard,
    onLogin,
    closePopover
}

export const BoardApp = connect(mapStateToProps, mapDispatchToProps)(_BoardApp)