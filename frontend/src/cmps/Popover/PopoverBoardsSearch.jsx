import { NavLink } from 'react-router-dom'
import { Popover } from './Popover'
import { connect } from 'react-redux'
import { Component } from 'react'
import { loadBoards } from '../../store/actions/board.actions'
import { Loader } from '../Loader'
class _PopoverBoardsSearch extends Component {

    state = {
        txt: ''
    }
    componentDidMount() {
        this.props.loadBoards()
    }

    handleChange = ({ target }) => {
        this.setState({ txt: target.value })
    }

    get filteredBoards() {
        const regex = new RegExp(this.state.txt, 'i')
        return this.props.boards.filter(board => regex.test(board.title))
    }

    render() {
        const { txt, boards } = this.props
        if (!boards) return <Loader />
        return <Popover >
            <div className="pop-over-boards-search">
                <input type="text" className="pop-over-input" onChange={this.handleChange} value={txt} autoFocus />
                {this.filteredBoards.map(board => {
                    return <NavLink key={board._id} to={`/board/${board._id}`} exact className="flex align center">
                        <div style={{ background: `${board.style.background} center center/ cover` }}></div>
                        <span style={{ background: `${board.style.background} center center/ cover` }}></span>
                        <span>{board.title}</span>
                    </NavLink>
                })}
            </div>
        </Popover >
    }
}

function mapStateToProps(state) {
    return {
        boards: state.boardModule.boards
    }
}
const mapDispatchToProps = {
    loadBoards
}

export const PopoverBoardsSearch = connect(mapStateToProps, mapDispatchToProps)(_PopoverBoardsSearch)