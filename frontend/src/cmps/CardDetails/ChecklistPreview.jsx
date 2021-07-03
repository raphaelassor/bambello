import React, { Component } from "react";
import CheckBoxOutlinedIcon from '@material-ui/icons/CheckBoxOutlined'
import CloseRoundedIcon from '@material-ui/icons/CloseRounded';
import { TextareaAutosize } from '@material-ui/core';
import { TodoList } from './TodoList'
import { TodoAdd } from './TodoAdd'
import { Loader } from '../Loader'
import { ProgressBar } from '../ProgressBar'

export class ChecklistPreview extends Component {

    state = {
        checklist: null,
        isTitleEdit: false
    }

    componentDidMount() {
        const { checklist } = this.props
        this.setState({ checklist })
    }

    onToggleTitleEdit = () => {
        const { isTitleEdit, checklist } = this.state
        if (!checklist.title) return
        this.setState({ isTitleEdit: !isTitleEdit }, () => {
            if (this.state.isTitleEdit) this.selectedInput.select()
        })
    }

    titleHandleChange = ({ target: { value } }) => {
        const { checklist } = this.state
        checklist.title = value
        this.setState({ checklist })
    }

    onSaveChecklistTitle = (ev) => {
        const { onSaveChecklist } = this.props
        const { checklist } = this.state
        if (ev.type === 'keydown' && ev.key !== 'Enter') return
        if (ev.type === 'keydown') ev.preventDefault()
        onSaveChecklist(checklist)
        this.onToggleTitleEdit()
    }

    get doneTodosProgress() {
        const { checklist: { todos } } = this.state
        if (!todos.length) return 0
        const doneTodosCount = todos.reduce((acc, todo) => {
            if (todo.isDone) acc++
            return acc
        }, 0)
        const doneTodosProgress = +(((doneTodosCount / todos.length) * 100).toFixed(0))
        return doneTodosProgress
    }

    onSaveTodo = (todo) => {
        const { onSaveChecklist } = this.props
        let { checklist, checklist: { todos } } = this.state
        if (!todo.title) {
            todos = todos.filter(currTodo => currTodo.id !== todo.id)
            checklist.todos = todos
            onSaveChecklist(checklist)
            return
        }
        const todoIdx = todos.findIndex(currTodo => todo.id === currTodo.id)
        todos[todoIdx] = todo
        checklist.todos = todos
        onSaveChecklist(checklist)
    }

    onAddTodo = (todo) => {
        const { onSaveChecklist } = this.props
        const { checklist } = this.state
        if (!checklist.todos) checklist.todos = []
        checklist.todos.push(todo)
        onSaveChecklist(checklist)
    }

    onRemoveTodo = (todoId) => {
        const { onSaveChecklist } = this.props
        let { checklist, checklist: { todos } } = this.state
        todos = todos.filter(currTodo => currTodo.id !== todoId)
        checklist.todos = todos
        onSaveChecklist(checklist)
    }

    render() {
        const { onRemoveChecklist, onCreateActivity } = this.props
        const { checklist, isTitleEdit } = this.state
        if (!checklist) return <Loader />
        const { todos } = checklist
        return (<div className="checklist-preview">
            {!isTitleEdit && <div className="window-modal-title flex align-center justify-space-between">
                <div className="flex align-center">
                    <CheckBoxOutlinedIcon />
                    <h3
                        onClick={() => this.onToggleTitleEdit()}>{checklist.title}</h3>
                </div>
                <button
                    onClick={() => onRemoveChecklist(checklist)} className="secondary-btn">Delete</button>
            </div>}
            {isTitleEdit && <div className="title-editor flex">
                <CheckBoxOutlinedIcon />
                <div className="flex column">
                    <TextareaAutosize
                        onKeyDown={this.onSaveChecklistTitle}
                        onChange={this.titleHandleChange}
                        value={checklist.title}
                        ref={(input) => { this.selectedInput = input }}
                        autoFocus
                        aria-label="empty textarea" />
                    <div className="checklist-controllers flex align-center">
                        <button className="primary-btn"
                            onClick={this.onSaveChecklistTitle}>
                            Save
                        </button>
                        <CloseRoundedIcon className="close-svg" onClick={this.onToggleTitleEdit} />
                    </div >
                </div>
            </div>}
            <ProgressBar completed={this.doneTodosProgress} />
            <TodoList
                todos={todos}
                onSaveTodo={this.onSaveTodo}
                onCreateActivity={onCreateActivity}
                onRemoveTodo={this.onRemoveTodo} />
            <TodoAdd onAddTodo={this.onAddTodo} />
        </div>)
    }
}