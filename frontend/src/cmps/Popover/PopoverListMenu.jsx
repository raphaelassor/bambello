import { Component } from "react";
import { Popover } from "./Popover";

export class PopoverListMenu extends Component{

    onDeleteList=()=>{
        const {currList,onSaveBoard,board,closePopover}=this.props
        currList.isArchived=true;
        board.lists=board.lists.filter((list=> list.id!==currList.id))
        onSaveBoard(board)
        closePopover()
    }

    render(){
        return <Popover title="List actions" togglePopover={this.props.toggleMenu}>
            <ul className="list-menu-content clean-list">
                <li onClick={this.onDeleteList}>Delete</li>
            </ul>
        </Popover>
    }
}
