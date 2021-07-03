import { Component } from 'react'
import { Link } from 'react-router-dom'
import { Draggable } from 'react-beautiful-dnd'
import { Card } from '../Card'

export class CardPreview extends Component {

    draggableStyle = (style, snapshot) => {
        if (!snapshot.isDropAnimating) {
            return style;
        }
        return {
            ...style,
            transitionDuration: `0.001s`,
        }
    }

    render() {
        const { board, card, currList, cardIdx } = this.props;
        return (
            <>
                <Draggable draggableId={card.id} index={cardIdx}>
                    {(provided, snapshot) => (
                        <div {...provided.draggableProps} {...provided.dragHandleProps} ref={provided.innerRef}
                            style={this.draggableStyle(provided.draggableProps.style, snapshot)} >
                            <Link to={`/board/${board._id}/${currList?.id}/${card.id}`} className="clean-link">
                                <Card card={card} board={board} />
                            </Link>
                        </div>
                    )}
                </Draggable>
            </>
        )
    }
}
