import { Component } from 'react'
import { connect } from 'react-redux'
import { boardService } from '../services/board.service'
import { ProfileAvatar } from './ProfileAvatar'
import { DueDateDisplay } from './DueDateDisplay'
import { CardPreviewChecklist } from './CardPreview/CardPreviewChecklist'
import { CardPreviewLabel } from './CardPreview/CardPreviewLabel'
import { CardPreviewComments } from './CardPreview/CardPreviewComments'
import { Subject as SubjectIcon } from '@material-ui/icons'
import { onSaveBoard } from '../store/actions/board.actions'
import { openPopover } from '../store/actions/app.actions'
import EditIcon from '@material-ui/icons/CreateOutlined'
import { TextareaAutosize } from '@material-ui/core';
import { eventBusService } from '../services/event-bus.service'
import { socketService } from '../services/socket.service'

class _Card extends Component {

    componentDidMount() {
        const { card, isEditMode } = this.props
        if (isEditMode)
            this.setState({ cardTitle: card.title })
    }

    isChecklistsEmpty = ({ checklists }) => {
        return checklists.every(checklist => !checklist.todos.length)
    }

    toggleCardDone = (ev) => {
        const { board, card, onSaveBoard } = this.props;
        if (card.isArchived) return
        ev.preventDefault();
        card.isDone = !card.isDone
        if (card.isDone) {
            const txt = 'the due date complete'
            const savedActivity = boardService.createActivity('marked', txt, card)
            board.activities.unshift(savedActivity)
            socketService.emit('app newActivity', savedActivity)
        }
        const savedBoard = boardService.updateCardInBoard(board, card)
        onSaveBoard(savedBoard);
    }

    onOpenCardEdit = (ev) => {
        const { card } = this.props
        if (card.isArchived) return
        ev.preventDefault();
        const elPos = this.cardContainer.getBoundingClientRect();
        eventBusService.emit('card-edit', { elPos, card });
    }

    onOpenPopover = (ev, type, member) => {
        const { card, openPopover } = this.props;
        if (card.isArchived) return
        ev.preventDefault();
        let elPos;
        let props;
        if (type === 'PROFILE') {
            elPos = ev.target.getBoundingClientRect();
            props = { member, card }
        } else if (type === 'EDIT_CARD') {
            elPos = this.cardContainer.getBoundingClientRect();
            props = { card }
        }
        openPopover(type, elPos, props)
    }

    get cardStyles() {
        const { isEditMode } = this.props
        const { coverMode, bgColor, bgImgUrl } = this.props.card.style

        if (coverMode === 'full' && bgImgUrl && !isEditMode) return {
            color: '#fff',
            backgroundImage: `url(${bgImgUrl})`,
            borderTopLeftRadius: '3px',
            borderTopRightRadius: '3px',
            minHeight: '130px'
        }
        else if (coverMode === 'full' && !isEditMode) return {
            backgroundColor: bgColor,
            minHeight: '56px',
            borderTopLeftRadius: '3px',
            borderTopRightRadius: '3px'
        }
        if (coverMode === 'header' && bgImgUrl) return {};
        if (coverMode === 'header' && !isEditMode) return {};
        if (isEditMode && !coverMode) return { borderRadius: '3px' }
        else if (isEditMode) return {};
        else return { borderRadius: '3px' };
    }

    get getCardHeaderStyles() {
        const { isEditMode } = this.props
        const { coverMode, bgColor, bgImgUrl } = this.props.card.style
        if (coverMode === 'full' && bgImgUrl && isEditMode) return {
            backgroundImage: `url(${bgImgUrl})`,
            minHeight: '130px'
        }
        if (coverMode === 'header' && bgImgUrl) return {
            backgroundImage: `url(${bgImgUrl})`,
            minHeight: '130px'
        }
        if (coverMode === 'full' || coverMode === 'header') return { backgroundColor: bgColor }
        else return {}
    }

    render() {

        const { isEditMode, card, board, handleChange, cardTitle } = this.props;
        const { coverMode } = card.style;

        return (
            <div className="card-preview-container" ref={(div) => { this.cardContainer = div }} onContextMenu={this.onOpenCardEdit}>
                {!isEditMode && <div className="card-preview-edit-btn" onClick={this.onOpenCardEdit}><EditIcon /></div>}
                {(coverMode === 'header' || (coverMode === 'full' && isEditMode)) && <div className="card-preview-header" style={this.getCardHeaderStyles}></div>}
                <div className={`card-preview ${coverMode === 'full' && 'cover-full'}`} style={this.cardStyles}>
                    {coverMode !== 'full' && <div className="card-preview-labels">
                        {!!card.labelIds.length && card.labelIds.map(labelId => <CardPreviewLabel key={labelId} labelId={labelId} labels={board.labels} isArchived={card.isArchived} isPreview={isEditMode} />)}
                    </div>
                    }
                    {isEditMode ?
                        <TextareaAutosize
                            className="card-preview-input"
                            name="cardTitle"
                            autoFocus
                            ref={elTextarea => this.elTextarea}
                            value={cardTitle}
                            onChange={handleChange}
                            onKeyDown={handleChange}
                            aria-label="empty textarea" />
                        :
                        <div className="card-preview-name">{card.title}</div>
                    }
                    {coverMode !== 'full' &&
                        <div className="card-preview-bagdes">
                            <div className="card-preview-icons">
                                {!!card.dueDate && <DueDateDisplay card={card} toggleCardDone={this.toggleCardDone} displayType="preview" />}
                                {card.description && <div><SubjectIcon /></div>}
                                {!!card.comments.length && <CardPreviewComments commentsCount={card.comments.length} />}
                                {!this.isChecklistsEmpty(card) && <CardPreviewChecklist checklists={card.checklists} />}
                            </div>
                            {!!card.members.length && <div className="card-preview-members">
                                {card.members.map(member => {
                                    return isEditMode ?
                                        <ProfileAvatar member={member} key={member._id} size={28} />
                                        :
                                        <ProfileAvatar member={member} key={member._id} size={28} onOpenPopover={this.onOpenPopover} />
                                })}
                            </div>
                            }
                        </div>
                    }
                </div>
            </div>
        )
    }
}

const mapDispatchToProps = {
    onSaveBoard,
    openPopover
}

export const Card = connect(null, mapDispatchToProps)(_Card)