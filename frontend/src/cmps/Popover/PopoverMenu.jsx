import { Component } from "react"
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { Popover } from "./Popover"
import { ActivitiesList } from "../ActivitiesList"
import { onSaveBoard } from '../../store/actions/board.actions'
import { openPopover } from '../../store/actions/app.actions'
import { ReactComponent as SearchIcon } from '../../assets/img/icons/search.svg'
import ActivityIcon from '@material-ui/icons/FormatListBulletedOutlined';


class _PopoverMenu extends Component {


    onOpenPopover = (ev, PopoverName) => {
        const elPos = ev.target.getBoundingClientRect()
        const props = {}
        this.props.openPopover(PopoverName, elPos, props)
    }
    get activities() {
        return this.props.board.activities
    }
    render() {
        const { board } = this.props
        return <div className="board-menu-wrapper">
            <Popover displayMode="menu" title="Menu">
                <div className="menu-details ">
                    <section>
                        <ul className="clean-list">
                            <li onClick={(ev) => this.onOpenPopover(ev, 'BACKGROUND')}>
                                <span style={{ background: board.style.background }}></span>
                            Change background </li>
                            <li onClick={(ev) => this.onOpenPopover(ev, 'BOARD_FILTER')}>
                                <SearchIcon />
                                Search cards</li>
                            <li onClick={(ev) => this.onOpenPopover(ev, 'ARCHIVE')}>
                                <i className="fas fa-archive menu-icon"></i>
                                Archive</li>
                        </ul>
                        <Link to="#" className="activity clean-link" onClick={(ev) => this.onOpenPopover(ev, 'ACTIVITY')} >
                            <ActivityIcon />
                            Activity</Link>
                        <ActivitiesList activities={this.activities} isGeneral={true} />
                    </section>
                </div>
            </Popover>
        </div>
    }
}

function mapStateToProps(state) {
    return {
        board: state.boardModule.board
    }
}

const mapDispatchToProps = {
    onSaveBoard,
    openPopover
}


export const PopoverMenu = connect(mapStateToProps, mapDispatchToProps)(_PopoverMenu)