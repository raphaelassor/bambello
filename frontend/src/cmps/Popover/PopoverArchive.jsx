import { Popover } from './Popover'
import { connect } from 'react-redux'
import { BackToPrevPopover } from './BackToPrevPopover'
import { onSaveBoard } from '../../store/actions/board.actions'
import { Component } from "react";
import { Card } from '../Card'
import { Link } from 'react-router-dom'
import { boardService } from '../../services/board.service'

class _PopoverArchive extends Component {
    state = {
        filterTxt: '',
        archivedCards: []
    }

    componentDidMount() {
        const { board } = this.props
        const archivedCards = board.lists.reduce((acc, list) => {
            list.cards.forEach(card => {
                if (card.isArchived) acc.push(card)
            })
            return acc
        }, [])
        this.setState({ archivedCards })
    }

    handleChange = ({ target }) => {
        this.setState({ filterTxt: target.value })
    }

    onRemoveCard = (card) => {
        const { board, onSaveBoard } = this.props
        const updatedBoard = boardService.removeCard(board, card)
        onSaveBoard(updatedBoard)
        this.updateArchivedState(card)
    }

    onSendToBoard = (card) => {
        const { board, onSaveBoard } = this.props
        card.isArchived = false
        const updatedBoard = boardService.updateCardInBoard(board, card)
        onSaveBoard(updatedBoard)
        this.updateArchivedState(card)
    }

    updateArchivedState = (card) => {
        this.setState({ archivedCards: this.state.archivedCards.filter(archivedCard => archivedCard.id !== card.id) })
    }

    get filteredCards() {
        const { archivedCards, filterTxt } = this.state
        const regEx = new RegExp(filterTxt, 'i')
        return archivedCards.filter(card => regEx.test(card.title))
    }

    getCardListId = (card) => {
        const { board } = this.props
        const list = board.lists.find(list => list.cards.some(listCard => listCard.id === card.id))
        if (!list) return ''
        return list.id
    }

    render() {
        const { filterTxt, archivedCards } = this.state
        const { board } = this.props
        return <Popover displayMode="menu-popovers" title="Archive">
            <div className="pop-over-archive-details">
                <BackToPrevPopover popoverName="MENU" />
                <input type="text" className="pop-over-input" value={filterTxt}
                    onChange={this.handleChange} autoFocus />
                {archivedCards.map((card, idx) => {
                    return <div key={idx}>
                        <Link to={`/board/${board._id}/${this.getCardListId(card)}/${card.id}`}>
                            <Card card={card} board={board} />
                        </Link>
                        <p className="archive-card-actions">
                            <button className="clean-btn"
                                onClick={() => this.onSendToBoard(card)}>Send to board</button>
                            <button className="clean-btn"
                                onClick={() => this.onRemoveCard(card)} href="">- Delete</button>
                        </p>
                    </div>
                })}
            </div>
        </Popover>
    }
}

function mapStateToProps(state) {
    return {
        board: state.boardModule.board,
    }
}

const mapDispatchToProps = {
    onSaveBoard,
}


export const PopoverArchive = connect(mapStateToProps, mapDispatchToProps)(_PopoverArchive)