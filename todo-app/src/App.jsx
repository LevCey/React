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
          <li key={todo.id}>
            {todo.text}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default App;
