import { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { closePopover, openPopover } from '../store/actions/app.actions'
import { onSaveBoard } from '../store/actions/board.actions'
import { boardService } from '../services/board.service';
import { Card } from './Card';
import { ScreenOverlay } from './ScreenOverlay'
import WebAssetIcon from '@material-ui/icons/WebAsset';
import LabelIcon from '@material-ui/icons/LocalOfferOutlined';
import CoverIcon from '@material-ui/icons/VideoLabel';
import CopyIcon from '@material-ui/icons/FileCopyOutlined';
import { ReactComponent as MemberIcon } from '../assets/img/icons/person.svg'

class _CardEdit extends Component {

    state = {
        top: null,
        left: null,
        width: null,
        cardTitle: ''
    }

    handleChange = (ev) => {
        if (ev.key === 'Enter') {
            this.onSaveCard(ev)
            return
        }
        const { name, value } = ev.target
        this.setState({ [name]: value })
    }

    componentDidMount() {
        this.setState({ cardTitle: this.props.card.title })
        this.onSetPopoverPos()
    }

    onSaveCard = ({ target }) => {
        const { board, card, onCloseCardEdit, onSaveBoard, closePopover } = this.props;
        if (target.name === 'cardTitle' || 'save') card.title = this.state.cardTitle;
        if (target.name === 'archive') card.isArchived = true;
        const savedBoard = boardService.updateCardInBoard(board, card)
        onSaveBoard(savedBoard);
        closePopover();
        onCloseCardEdit();
    }

    onOpenPopover = (ev, popoverName) => {
        const elPos = ev.target.getBoundingClientRect()
        const props = {
            card: this.props.card
        }
        this.props.openPopover(popoverName, elPos, props)
    }

    onSetPopoverPos = () => {
        const { top, left, width } = this.props.elPos
        this.setState({ top, left, width })
    }

    get list() {
        const { card, board } = this.props
        const list = board.lists.find(list => list.cards.some(currCard => card.id === currCard.id))
        return list
    }

    render() {
        const { card, board, onCloseCardEdit } = this.props
        const { top, left, width, cardTitle } = this.state

        return <>
            <ScreenOverlay goBack={onCloseCardEdit} styleMode={'darken'} closeBtn={true}>
                <div className="edit-pop-over" style={{ top: `${top}px`, left: `${left}px`, width: `${width}px` }} ref={(div) => { this.selectedDiv = div }} >
                    <div>
                        <Card card={card} isEditMode={true} board={board} handleChange={this.handleChange} cardTitle={cardTitle} />
                        <button className="edit-pop-over-save primary-btn" name="save"
                            onClick={this.onSaveCard}>Save</button>
                    </div>
                    <div className="edit-pop-over-btns">
                        <Link
                            to={`/board/${board._id}/${this.list.id}/${card.id}`}
                            className="open-card-btn clean-btn"
                            onClick={() => onCloseCardEdit()}>
                            <WebAssetIcon />
                            Open card
                        </Link>
                        <button
                            className="edit-labels-btn clean-btn"
                            onClick={(ev) => this.onOpenPopover(ev, 'LABELS')}>
                            <LabelIcon />
                            Edit labels
                        </button>
                        <button
                            className="change-members-btn clean-btn"
                            onClick={(ev) => this.onOpenPopover(ev, 'MEMBERS')}>
                            <MemberIcon />
                            Change members
                        </button>
                        <button
                            className="change-cover-btn clean-btn"
                            onClick={(ev) => this.onOpenPopover(ev, 'COVER')}>
                            <CoverIcon />
                            Change cover
                        </button>
                        <button
                            className="move-btn clean-btn"
                            onClick={(ev) => this.onOpenPopover(ev, 'MOVE')}>
                            <i className="fas fa-arrow-right icon-sm"></i>
                            Move
                        </button>
                        <button
                            className="copy-btn clean-btn"
                            onClick={(ev) => this.onOpenPopover(ev, 'COPY')}>
                            <CopyIcon />
                            Copy
                        </button>
                        <button
                            className="edit-dates-btn clean-btn"
                            onClick={(ev) => this.onOpenPopover(ev, 'DATE')}>
                            <i className="far fa-clock icon-sm "></i>
                            Edit dates
                        </button>
                        <button
                            className="archive-btn clean-btn"
                            name="archive"
                            onClick={(ev) => this.onSaveCard(ev)}>
                            <i className="fas fa-archive icon-sm"></i>
                            Archive
                        </button>
                    </div>
                </div>
            </ScreenOverlay>
        </>
    }
}


const mapDispatchToProps = {
    closePopover,
    openPopover,
    onSaveBoard
}

function mapStateToProps(state) {
    return {
        board: state.boardModule.board
    }
}
export const CardEdit = connect(mapStateToProps, mapDispatchToProps)(_CardEdit)