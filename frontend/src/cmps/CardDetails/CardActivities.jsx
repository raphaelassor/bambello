import React, { Component } from 'react';
import FormatListBulletedIcon from '@material-ui/icons/FormatListBulleted';
import { CommentAdd } from './CommentAdd'
import { ActivitiesList } from '../ActivitiesList'

export class CardActivities extends Component {

    state = {
        isOnlyComments: true
    }

    get cardActivities() {
        const { isOnlyComments } = this.state
        const { card, activities } = this.props
        const cardActivities = activities.filter(currActivity => {
            if (!currActivity.card) return false
            if (isOnlyComments) {
                return (currActivity.card.id === card.id
                    && currActivity.actionType === 'comment')
            }
            return (currActivity.card.id === card.id)
        })
        return cardActivities
    }

    onToggleFilter = () => {
        const { isOnlyComments } = this.state
        this.setState({ isOnlyComments: !isOnlyComments })
    }

    render() {
        const { card } = this.props
        const { isOnlyComments } = this.state
        return (
            <div className="card-activities flex column">
                <div className="window-modal-title flex justify-space-between">
                    <div className="flex align-center">
                        <FormatListBulletedIcon />
                        <h3>Activities</h3>
                    </div>
                    <button className="secondary-btn" onClick={this.onToggleFilter}>
                        {isOnlyComments ? 'Show details' : 'Hide details'}
                    </button>
                </div>
                <CommentAdd card={card} />
                {!!this.cardActivities.length && <ActivitiesList activities={this.cardActivities} isGeneral={false} />}
            </div>
        )
    }
}