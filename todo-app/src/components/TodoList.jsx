import TodoItem from "./TodoItem";

function TodoList({todos, onToggle, onDelete}){
    if(todos.length === 0){
        return <p className='empty-message'>Henüz görev eklemediniz. Hadi başlayın! 🚀</p>;
    }
    return (
        <ul className="todo-list">
            {todos.map((todo) => (
                <TodoItem 
                    key={todo.id}
                    todo={todo}
                    onToggle={onToggle}
                    onDelete={onDelete}
                />
            ))}
        </ul>
    );
}

export default TodoList;