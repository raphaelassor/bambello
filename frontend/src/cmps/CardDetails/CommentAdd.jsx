import React, { Component } from "react";
import { boardService } from '../../services/board.service'
import { connect } from 'react-redux'
import { TextareaAutosize } from '@material-ui/core'
import { ProfileAvatar } from '../ProfileAvatar'
import { onSaveBoard } from '../../store/actions/board.actions'
import { socketService } from "../../services/socket.service";


class _CommentAdd extends Component {

    state = {
        txt: '',
        isEdit: false
    }

    onToggleEdit = () => {
        const { isEdit } = this.state
        this.setState({ isEdit: !isEdit })
    }

    handleChange = ({ target: { value } }) => {
        this.setState({ txt: value })
    }

    onSaveComment = (ev) => {
        if (ev.type === 'keydown' && ev.key !== 'Enter') return
        if (ev.type === 'keydown') ev.preventDefault()
        const { card, board, onSaveBoard } = this.props
        const { txt } = this.state
        const savedActivity = boardService.createActivity('comment', txt, card)
        socketService.emit('app newActivity', savedActivity)
        board.activities.unshift(savedActivity)
        onSaveBoard(board)
        this.selectedInput.blur()
        this.setState({ txt: '' })
    }

    render() {
        const { txt, isEdit } = this.state
        const { loggedInUser } = this.props
        return (
            <div className="comment-add flex">
                <ProfileAvatar member={loggedInUser} size={32} />
                <div
                    className={`comment-editor flex column justify-space-between full ${isEdit ? 'edit-open' : ''}`}>
                    <TextareaAutosize
                        onBlur={this.onToggleEdit}
                        onFocus={this.onToggleEdit}
                        onChange={this.handleChange}
                        onKeyDown={this.onSaveComment}
                        value={txt}
                        aria-label="empty textarea"
                        placeholder="Write a comment"
                        autoCorrect="false"
                        autoComplete="false"
                        ref={(input) => this.selectedInput = input}
                    />
                    {isEdit && <button
                        type="submit"
                        className="primary-btn"
                        onMouseDown={this.onSaveComment}>
                        Save
                    </button>}
                </div>
            </div >
        )
    }
}

function mapStateToProps(state) {
    return {
        board: state.boardModule.board,
        loggedInUser: state.appModule.loggedInUser
    }
}

const mapDispatchToProps = {
    onSaveBoard,
}

export const CommentAdd = connect(mapStateToProps, mapDispatchToProps)(_CommentAdd)