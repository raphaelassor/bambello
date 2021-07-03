import { Component } from 'react'
import { ReactComponent as AddIcon } from '../assets/img/icons/add.svg'
import { utilsService } from '../services/utils.service'
import { TextareaAutosize } from '@material-ui/core';
import CloseRoundedIcon from '@material-ui/icons/CloseRounded';

export class CardListAdd extends Component {
    state = {
        isOpen: false,
        titleTxt: ''
    }


    handleChange = (ev) => {
        if (ev.key === 'Enter') {
            ev.preventDefault();
            this.onAddList()
            return
        }
        const { value } = ev.target;
        this.setState({ titleTxt: value });
    }

    toggleListAdd = () => {
        const { isOpen } = this.state;
        this.setState({ isOpen: !isOpen });
    }

    onAddList = () => {
        const { titleTxt } = this.state
        if (!titleTxt) {
            this.textArea.focus();
            return
        }

        const { board, onSaveBoard } = this.props
        const list = {
            id: utilsService.makeId(),
            title: titleTxt,
            cards: []
        }

        board.lists.push(list);
        this.setState({ titleTxt: '' }, () => onSaveBoard(board))
    }


    render() {
        const { lists } = this.props.board
        const { titleTxt, isOpen } = this.state

        return (
            <div className="card-list-add-wrapper">
                {isOpen ?
                    <div className="card-list-add-open">
                        <TextareaAutosize className="card-list-add-input" ref={(textArea) => { this.textArea = textArea; }} value={titleTxt} autoFocus onBlur={this.toggleListAdd} onChange={this.handleChange} onKeyDown={this.handleChange} placeholder="Enter list title..." aria-label="empty textarea" />
                        <div>
                            <button className="primary-btn" onMouseDown={this.onAddList}>Add list</button>
                            <CloseRoundedIcon onMouseDown={this.toggleListAdd} />
                        </div>
                    </div>
                    :
                    <div className="card-list-add" onClick={this.toggleListAdd}>
                        <AddIcon /> Add {lists.length > 1 ? 'another' : 'a'} list
                        </div>
                }
            </div>
        )
    }
}
