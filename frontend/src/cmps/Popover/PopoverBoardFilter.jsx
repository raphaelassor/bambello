import { Component } from "react";
import { setFilter } from '../../store/actions/board.actions'
import { connect } from 'react-redux'
import { PopoverLabelPreview } from './PopoverLabelPreview'
import { PopoverMemberPreview } from './PopoverMemberPreview'
import { Popover } from './Popover'
import { BackToPrevPopover } from "./BackToPrevPopover";
class _PopoverBoardFilter extends Component {

    state = {
        filterBy: {
            labels: [],
            txt: '',
            members: [],
        }
    }
    componentDidMount(){
        const {filterBy:{labels,txt,members}}=this.props
        this.setState({ filterBy: { labels, txt ,members } },()=>{
        })
    }

    componentWillUnmount(){
        // this.props.setFilter({labels:[],txt:'',members:[]})
    }

    handleChange=({ target })=> {
        this.setState({ filterBy: { ...this.state.filterBy, txt: target.value } },()=>{
            this.props.setFilter(this.state.filterBy)
        })
    }
 
    toggleFilter = (filterEntity,filterName) => {
        const keyId=filterName==='members'? '_id' : 'id'
        const filterGroup = this.state.filterBy[filterName]
        const idx = filterGroup.findIndex(entity => entity[keyId] === filterEntity[keyId])
        if (idx !== -1) filterGroup.splice(idx, 1)
        else filterGroup.push(filterEntity)
        this.setState({ filterBy: { ...this.state.filterBy, [filterName]:filterGroup } },()=>{
            this.props.setFilter(this.state.filterBy)
        })
    }

    isLabelSelected = (label) => {
        return this.state.filterBy.labels.some(filterLabel => filterLabel.id === label.id)
    }
    isMemberSelected=(member)=>{
        return this.state.filterBy.members.some(filterMember => filterMember._id === member._id)
    }

    render() {
        const { txt } = this.state.filterBy
        const { board } = this.props
        return <Popover title="Search" displayMode="menu-popovers" >
            <BackToPrevPopover popoverName="MENU" />
            <div className="board-filter-pop-over">
                <input type="text " className="pop-over-input" value={txt} onChange={this.handleChange} autoFocus/>
                <p>Search by term, label, member, or due time</p>
                <hr/>
                {board.labels.map(label => <PopoverLabelPreview key={label.id} label={label} toggleLabel={this.toggleFilter} isFilterPreview={true} isSelected={this.isLabelSelected(label)} />)}
            <hr/>
            {board.members.map(member => <PopoverMemberPreview key={member._id} member={member} toggleMember={this.toggleFilter} previewMode={true} isSelected={this.isMemberSelected(member)} />)}
            </div>
        </Popover>
    }
}
function mapStateToProps(state) {
    return {
        board: state.boardModule.board,
        filterBy:state.boardModule.filterBy
    }
}

const mapDispatchToProps = {
    setFilter,

}


export const PopoverBoardFilter = connect(mapStateToProps, mapDispatchToProps)(_PopoverBoardFilter)