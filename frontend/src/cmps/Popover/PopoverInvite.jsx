import { onSaveBoard } from "../../store/actions/board.actions"
import { Popover } from "./Popover"
import { Component } from 'react'
import { connect } from 'react-redux'
import { PopoverMemberPreview } from './PopoverMemberPreview'
import { userService } from '../../services/user.service'
class _PopoverInvite extends Component {

    state = {
        memberTxt: '',
        members: [],

    }

    async componentDidMount() {
        const members = await userService.getUsers()
        this.setState({ members })
    }
    handleChange = ({ target }) => {

        this.setState({ memberTxt: target.value })
    }
    addMember = (member) => {
        const { board, onSaveBoard } = this.props
        const idx = board.members.findIndex(boardMember => boardMember._id === member._id)
        if (idx !== -1) return
        board.members.push(member)
        onSaveBoard(board)
    }

    isMemberInBoard = (member) => {
        return this.props.board.members.some(boardMember => boardMember._id === member._id)
    }
    get filteredMembers() {
        const { members, memberTxt } = this.state
        const regex = new RegExp(memberTxt, 'i')
        return members.filter(member => regex.test(member.fullname)).slice(0, 10)
    }

    render() {
        
        return <Popover title="Invite to board">
            <div className="invite-details flex column">
                <input type="text" autoFocus className="pop-over-input" onChange={this.handleChange} />
                <div className="members">
                    {this.filteredMembers.map(member => <PopoverMemberPreview key={member._id} member={member}
                        toggleMember={this.addMember} isSelected={this.isMemberInBoard(member)} />)}
                </div>

                <button className="primary-btn">Send invitation</button>
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
    onSaveBoard
}


export const PopoverInvite = connect(mapStateToProps, mapDispatchToProps)(_PopoverInvite)