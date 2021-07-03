import React, { Component } from 'react'
import { ChecklistPreview } from './ChecklistPreview'
import { connect } from 'react-redux'
import { boardService } from '../../services/board.service'
import { socketService } from '../../services/socket.service'
import { onSaveBoard } from '../../store/actions/board.actions'

class _CardChecklists extends Component {

    onSaveChecklist = (checklist) => {
        if (!checklist.title) return
        const { onSaveCardChecklists, checklists } = this.props
        const checklistIdx = checklists.findIndex(currChecklist => currChecklist.id === checklist.id)
        checklists[checklistIdx] = checklist
        onSaveCardChecklists(checklists)
    }

    onRemoveChecklist = (checklist) => {
        let { onSaveCardChecklists, checklists } = this.props
        checklists = checklists.filter(currChecklist => currChecklist.id !== checklist.id)
        this.onCreateActivity('removed', checklist.title)
        onSaveCardChecklists(checklists)
    }

    onCreateActivity = (type, txt) => {
        let { card, board, onSaveBoard } = this.props
        const savedActivity = boardService.createActivity(type, txt, card)
        socketService.emit('app newActivity',savedActivity)
        board.activities.unshift(savedActivity)
        onSaveBoard(board)
    }

    render() {
        const { checklists } = this.props
        return (
            <div className="card-checklists" >
                {checklists.map(checklist => {
                    return <ChecklistPreview
                        key={checklist.id}
                        checklist={checklist}
                        onRemoveChecklist={this.onRemoveChecklist}
                        onSaveChecklist={this.onSaveChecklist}
                        onCreateActivity={this.onCreateActivity}
                    />
                })}
            </div>
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

export const CardChecklists = connect(mapStateToProps, mapDispatchToProps)(_CardChecklists)