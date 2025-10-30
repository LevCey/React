import { useState, useEffect } from 'react'
import './App.css'

// Şimdilik TodoItem'i import edelim
import TodoItem from './components/TodoItem'

function App() {
  const [todos, setTodos] = useState(() => {
    const savedTodos = localStorage.getItem('todos')
    return savedTodos ? JSON.parse(savedTodos) : []
  })
  
  const [inputValue, setInputValue] = useState('')

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos))
  }, [todos])

  const addTodo = () => {
    if (inputValue.trim() !== '') {
      setTodos([...todos, {
        id: Date.now(),
        text: inputValue,
        completed: false
      }])
      setInputValue('')
    }
  }

  const toggleTodo = (id) => {
    setTodos(todos.map(todo => 
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ))
  }

  const deleteTodo = (id) => {
    setTodos(todos.filter(todo => todo.id !== id))
  }

  return (
    <div className="app">
      <h1>Yapılacaklar Listem</h1>
      
      <div className="input-container">
        <input 
          type="text"
          placeholder="Yeni görev ekle..."
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyUp={(e) => e.key === 'Enter' && addTodo()}
        />
        <button onClick={addTodo}>Ekle</button>
      </div>

      <ul className="todo-list">
        {todos.map((todo) => (
          <TodoItem 
            key={todo.id}
            todo={todo}
            onToggle={toggleTodo}
            onDelete={deleteTodo}
          />
        ))}
      </ul>

      <div className="stats">
        <p>Toplam: {todos.length} | Tamamlanan: {todos.filter(t => t.completed).length}</p>
      </div>
    </div>
  )
}

export default App