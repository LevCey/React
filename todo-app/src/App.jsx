import { useState } from 'react';
import './App.css';

function App() {

  const [inputValue, setInputValue] = useState('');
  const [todos, setTodos] = useState([]);

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  }

   // Todo ekleme fonksiyonu
  const addTodo = () => {
    if (inputValue.trim() !== '') {
      const newTodo = {
        id: Date.now(), // Basit bir ID
        text: inputValue,
        completed: false
      }
      setTodos([...todos, newTodo]) // Mevcut listeye yeni todo ekle
      setInputValue('') // Input'u temizle
    }
  }

  // Enter tuşuna basınca da eklensin
  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      addTodo()
    }
  }

  // Todo'yu tamamla/tamamlama
  const toggleTodo = (id) => {
    setTodos(todos.map( todo => 
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ))
  }

  // TOdo'yu sil
  const deleteTodo = (id) => {
    setTodos(todos.filter( todo => todo.id !== id ))
  }

  return ( 
    <div className="app">
      <h1>Yapılcaklar Listesi </h1>

      <div className='input-container'>
        <input 
          type= "text"
          placeholder="Yeni görev ekle..."
          value={inputValue}
          onChange={handleInputChange}  
          onKeyUp={handleKeyPress}
        />
        <button onClick={addTodo}>Ekle</button>
      </div>

      {/* Todo listesi */}
      <ul className="todo-list">
        {todos.map((todo) => (
          <li key={todo.id} className={todo.completed ? 'completed' : ''}>
            <input
              type="checkbox"
              checked={todo.completed}
              onChange={()=> toggleTodo(todo.id)}
            />
            <span>{todo.text}</span>
            <button className="delete-btn" onClick={() => deleteTodo(todo.id)}>Sil</button>
          </li> 
        ))}
      </ul>

      {/* istatistik */}
      <div className='stats'>
        <p>Toplam: {todos.length} | Tamamlanan: {todos.filter(todo => todo.completed).length}</p>
      </div>
    </div>
  )
}

export default App;
