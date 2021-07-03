import { connect } from 'react-redux'
import React, { Component } from 'react'
import { loadBoards, onSaveBoard } from '../store/actions/board.actions'
import { BoardList } from '../cmps/BoardList'
import { ReactComponent as BoardIcon } from '../assets/img/icons/board.svg'
import { Loader } from '../cmps/Loader'

class _Workspace extends Component {

    componentDidMount() {
        this.props.loadBoards()
    }

    get favoriteBoards() {
        const { boards } = this.props
        return boards.filter(board => board.isFavorite)
    }

    onToggleFavorite = (ev, boardId) => {
        ev.preventDefault()
        const { boards, onSaveBoard } = this.props
        const board = boards.find(board => board._id === boardId)
        board.isFavorite = !board.isFavorite
        onSaveBoard(board)
    }

    render() {
        const { boards } = this.props
        if (!boards) return <Loader />
        return (
            <section className="workspace-container flex align-flex-start justify-center ">
                <div className="boards-wrapper flex column">
                    <div className="boards-preview flex column">
                        <div className="preview-title flex align-center">
                            <i className="far fa-star"></i>
                            <h3>Starred boards</h3>
                        </div>
                        <BoardList onToggleFavorite={this.onToggleFavorite} boards={this.favoriteBoards} />
                    </div>
                    <div className="boards-preview">
                        <div className="preview-title flex align-center">
                            <BoardIcon />
                            <h3>Workspace</h3>
                        </div>
                        <BoardList onToggleFavorite={this.onToggleFavorite} boards={boards} />
                    </div>
                </div>
            </section>
        )
    }
}

function mapStateToProps(state) {
    return {
        boards: state.boardModule.boards,
        loggedInUser: state.appModule.loggedInUser
    }
}

const mapDispatchToProps = {
    loadBoards,
    onSaveBoard,
}

export const Workspace = connect(mapStateToProps, mapDispatchToProps)(_Workspace)
