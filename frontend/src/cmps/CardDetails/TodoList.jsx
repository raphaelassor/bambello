import { TodoPreview } from './TodoPreview'
export function TodoList({ todos, onSaveTodo, onRemoveTodo, onCreateActivity }) {
    return (
        <div className="todo-list">
            {todos.map(todo => {
                return <TodoPreview
                    key={todo.id}
                    todo={todo}
                    onSaveTodo={onSaveTodo}
                    onRemoveTodo={onRemoveTodo}
                    onCreateActivity={onCreateActivity}
                />
            })}
        </div>
    )
}