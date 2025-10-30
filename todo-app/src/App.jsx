import { useState, useEffect } from 'react';
import './App.css';

function App() {

// Localstorage'dan todo verileri yükle (varsa)
  const [todos, setTodos] = useState(() => {
    const savedTodos = localStorage.getItem('todos');
    return savedTodos ? JSON.parse(savedTodos) : [];
  });

  const [inputValue, setInputValue] = useState('');

  // Todos her değiştiğinde localStorage'a kaydet
  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos))
  }, [todos]);


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

  // Tüm todoları temizle
  const clearAllTodos = () => {
    if(window.confirm("Tüm görevleri silmek istediğinize emin misiniz?")) {
      setTodos([])
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

      {todos.length > 0 ? (
      <>
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
        <button className="clear-btn" onClick={clearAllTodos}>Tümünü Temizle</button>
      </div>
      </> ): (
        <p>Henüz eklenmiş görev yok.</p>
      )}
    </div>   
  )
}

export default App;
