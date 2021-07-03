import React, { Component } from "react";
import { TextareaAutosize } from '@material-ui/core';
import CloseRoundedIcon from '@material-ui/icons/CloseRounded';
import { utilsService } from '../../services/utils.service'

export class TodoAdd extends Component {
    state = {
        isEditMode: false,
        todo: {
            title: ''
        }
    }

    onEditMode = () => {
        const { isEditMode } = this.state
        this.setState({ isEditMode: !isEditMode })
    }

    handleChange = ({ target: { value } }) => {
        this.setState({ todo: { title: value } })
    }

    onCreateTodo = (ev) => {
        if (ev.type === 'keydown' && ev.key !== 'Enter') return
        if (ev.type === 'keydown') ev.preventDefault()
        const { onAddTodo } = this.props
        const { todo } = this.state
        if (!todo.title) return
        todo.id = utilsService.makeId()
        todo.isDone = false
        this.setState({ todo: { title: '' } }, () => {
            onAddTodo(todo)
        })
    }

    render() {
        const { todo: { title }, isEditMode } = this.state
        return (
            <div className="todo-add">
                <button className={`secondary-btn ${isEditMode ? 'hidden' : 'show'}`}
                    onClick={() => this.onEditMode()} >
                    Add an item
                </button>
                {isEditMode && <>
                    <TextareaAutosize
                        onBlur={() => this.onEditMode()}
                        onChange={this.handleChange}
                        onKeyDown={(ev) => this.onCreateTodo(ev)}
                        value={title}
                        autoFocus
                        placeholder="Add an item"
                        autoCorrect="false"
                        aria-label="empty textarea" />
                    <div className="checklist-controllers flex align-center">
                        <button className="primary-btn"
                            onMouseDown={(ev) => this.onCreateTodo(ev)}>Save</button>
                        <CloseRoundedIcon className="close-svg" />
                    </div >
                </>
                }
            </div>
        )
    }
}
