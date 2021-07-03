import { ActivitiesList } from "../ActivitiesList";
import { connect } from 'react-redux';
import { Popover } from "./Popover";
import { Component } from "react";
import { NetworkCellOutlined } from "@material-ui/icons";
import { BackToPrevPopover } from "./BackToPrevPopover";


class _PopoverActivity extends Component {

    state = {
        isCommentsOnly: false
    }
    toggleFilter = (filter) => {
        const { isCommentsOnly } = this.state
        if ((!isCommentsOnly && filter === 'all') || (isCommentsOnly && filter === 'comments')) return
        this.setState({ isCommentsOnly: !this.state.isCommentsOnly })
    }
    get activities() {
        const { board } = this.props
        const { isCommentsOnly } = this.state
        const activities = !isCommentsOnly ?
            board.activities
            :
            board.activities.filter(activity => activity.actionType === 'comment')
        return activities
    }
    render() {
        const { isCommentsOnly } = this.state

        return <Popover displayMode="menu-popovers" title="Activity">
            <div className="activity-pop-over-details" >
                <BackToPrevPopover popoverName="MENU" />
                <div className="filter-container flex">
                    <button
                        onClick={() => this.toggleFilter('all')}
                        className={`clean-btn filter-btn ${!isCommentsOnly && 'selected'}`}>
                        All
                    </button>
                    <button
                        onClick={() => this.toggleFilter('comments')}
                        className={`clean-btn filter-btn ${isCommentsOnly && 'selected'}`}>
                        Comments
                    </button>
                </div>
                <div className="activity-list-pop-over">
                    <ActivitiesList activities={this.activities} isGeneral={true} />
                </div>
            </div>
        </Popover>
    }
}

function mapStateToProps(state) {
    return {
        board: state.boardModule.board,
    }
}
export const PopoverActivity = connect(mapStateToProps, NetworkCellOutlined)(_PopoverActivity)