import React, { Component } from "react"
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank'
import CheckBoxIcon from '@material-ui/icons/CheckBox';
import CloseRoundedIcon from '@material-ui/icons/CloseRounded';
import DeleteIcon from '@material-ui/icons/Delete';
import { TextareaAutosize } from '@material-ui/core';


export class TodoPreview extends Component {

    state = {
        todo: null,
        isInputSelected: false
    }

    componentDidMount() {
        const { todo } = this.props
        this.setState({ todo })
    }

    handleChange = ({ target: { value } }) => {
        const { todo } = this.state
        todo.title = value
        this.setState({ todo })
    }

    onEditClicked = () => {
        this.setState({ isInputSelected: true }, () => {
            this.selectedInput.focus()
            this.selectedInput.select()
        })
    }

    onFinishEditing = (ev) => {
        if (ev.type === 'keydown' && ev.key !== 'Enter') return
        const { onSaveTodo } = this.props
        const { todo } = this.state
        this.setState({ isInputSelected: false }, () => {
            this.selectedInput.blur()
            onSaveTodo(todo)
        })
    }

    onToggleDone = () => {
        const { onSaveTodo, onCreateActivity } = this.props
        const { todo } = this.state
        todo.isDone = !todo.isDone
        if (todo.isDone) {
            onCreateActivity('completed', todo.title)
        }
        this.setState({ todo }, onSaveTodo(this.state.todo))
    }

    render() {
        const { todo, isInputSelected } = this.state
        const { onRemoveTodo } = this.props
        if (!todo) return '' //loader
        const { title, isDone } = todo
        return (
            <div className="todo-preview-container flex column">
                <div className="todo-preview flex align-center">
                    {isDone ?
                        <CheckBoxIcon className="checked" onClick={() => this.onToggleDone()} /> :
                        <CheckBoxOutlineBlankIcon className="non-checked" onClick={() => this.onToggleDone()} />}
                    <TextareaAutosize className={isDone ? 'done' : ''}
                        onFocus={this.onEditClicked}
                        onBlur={(ev) => this.onFinishEditing(ev)}
                        onKeyDown={(ev) => this.onFinishEditing(ev)}
                        onChange={this.handleChange}
                        value={title}
                        autoCorrect="false"
                        autoComplete="false"
                        ref={(input) => { this.selectedInput = input }}
                        aria-label="empty textarea" />
                    {!isInputSelected && <DeleteIcon className="delete-svg" onClick={() => onRemoveTodo(todo.id)} />}
                </div>
                <div className={`checklist-controllers flex align-center ${isInputSelected ? 'show' : 'hidden'}`}>
                    <button className="primary-btn" onClick={() => this.onFinishEditing()}>Save</button>
                    <CloseRoundedIcon className="close-svg" />
                </div >
            </div >
        )
    }
}