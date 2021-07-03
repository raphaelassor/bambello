import React, { Component } from 'react'
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank'
import CheckBoxIcon from '@material-ui/icons/CheckBox';
import { ReactComponent as DropdownIcon } from '../assets/img/icons/dropdown.svg'
import { openPopover } from '../store/actions/app.actions';
import { connect } from 'react-redux';
import { onSaveBoard } from '../store/actions/board.actions'

class _DueDateDisplay extends Component {

    dueDateFormat = (dueDate) => {
        const currYear = new Date().getFullYear()
        const dueYear = new Date(dueDate).getFullYear()
        if (dueYear !== currYear) {
            return new Date(dueDate).toLocaleString('en-GB', { year: 'numeric', month: 'short', day: 'numeric' })
        }
        else return new Date(dueDate).toLocaleString('en-GB', { month: 'short', day: 'numeric' })
    }

    getDueStatus = () => {
        const now = Date.now()
        const { card } = this.props
        let dueStatus = '';
        if (card.isDone) dueStatus = 'done';
        else if (now > card.dueDate) dueStatus = 'overdue';
        else {
            const timeDiff = card.dueDate - now;
            if (timeDiff < 86400000) dueStatus = 'due-soon'
        }
        return dueStatus
    }

    onToggleCardDone = () => {
        this.props.toggleCardDone()
    }

    get dueMsg() {
        switch (this.getDueStatus()) {
            case 'done': return 'COMPLETE';
            case 'due-soon': return 'DUE SOON';
            case 'overdue': return 'OVERDUE';
            default: return ''
        }
    }


    onOpenPopover = (ev, type) => {
        const { card, openPopover } = this.props
        ev.preventDefault()
        const elPos = ev.target.getBoundingClientRect()
        const props = { card }
        openPopover(type, elPos, props)
    }

    render() {
        // TODO: IMPLEMENT TIME TRACKING
        const { card, toggleCardDone, displayType } = this.props
        const dueStatus = this.getDueStatus();
        return <> { displayType === 'preview' ?
            <div className={`card-preview-date ${dueStatus}`} onClick={toggleCardDone}>
                <div className="card-preview-date-icon"></div>
                <div>
                    {this.dueDateFormat(card.dueDate)}
                </div>
            </div>
            :
            <div className="card-details-date item-container">
                <h3 className="card-details-item-header">DUE DATE</h3>
                <div className="flex align-center">

                    {card.isDone ?
                        <CheckBoxIcon className="checked" onClick={this.onToggleCardDone} /> :
                        <CheckBoxOutlineBlankIcon className="non-checked" onClick={this.onToggleCardDone} />}
                    <button className="secondary-btn" onClick={(ev) => this.onOpenPopover(ev, 'DATE')}>
                        <div className="flex align-center">
                            <span> {this.dueDateFormat(card.dueDate)}</span>
                            <span className={`due-msg ${dueStatus}`}>{this.dueMsg}</span>
                            <DropdownIcon />
                        </div>
                    </button>
                </div>
            </div >
        }</>

    }
}
function mapStateToProps(state) {
    return {
        currPopover: state.appModule.currPopover,
        board: state.boardModule.board
    }
}

const mapDispatchToProps = {
    openPopover,
    onSaveBoard
}

export const DueDateDisplay = connect(mapStateToProps, mapDispatchToProps)(_DueDateDisplay)


