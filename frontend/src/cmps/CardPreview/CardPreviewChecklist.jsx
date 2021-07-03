import { Component } from 'react'
export class CardPreviewChecklist extends Component {
    
    get todosMap() {
        const { checklists } = this.props
        const todosMap = checklists.reduce((acc, checklist) => {
            acc['todosCount'] += checklist.todos.length
            checklist.todos.forEach(todo => {
                if (todo.isDone) acc['doneTodosCount']++
            })
            return acc;
        }, { todosCount: 0, doneTodosCount: 0 })
        return todosMap
    }

    render() {
        const {doneTodosCount, todosCount} = this.todosMap
        return (
            <div className={`card-preview-checklist ${doneTodosCount === todosCount && 'done'}`}>
                <div className="check-icon"></div>
                <span>{`${doneTodosCount}/${todosCount}`}</span>
            </div>
        )
    }
}
