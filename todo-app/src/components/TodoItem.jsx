function TodoItem({todo, onToggle, onDelete}){
    <li className={todo.completed ? 'completed' : ''}>
        <input
            type="checkbox"
            checked={todo.completed}
            onChange={()=> onToggle(todo.id)}
        />
        <span>{todo.text}</span>
        <button 
            className="delete-btn" 
            onClick={() => onDelete(todo.id)}>
            Sil
        </button>
    </li>
}

export default TodoItem;