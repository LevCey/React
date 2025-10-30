import { useState, useEffect } from 'react';
import TodoInput from './components/TodoInput';
import TodoList from './components/TodoList';
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
    localStorage.setItem('todos', JSON.stringify(todos));
    //console.log("Todos updated in localStorage:  uzunluğu ", todos.length);
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
      <h1>Yapılcaklar Listesi</h1>

      <TodoInput 
        value={inputValue}
        onChange={handleInputChange}
        onAdd={addTodo}
        onKeyPress={handleKeyPress}
      />

      <TodoList 
        todos={todos}
        onToggle={toggleTodo}
        onDelete={deleteTodo}
      />

      {todos.length > 0 && (
        <div className="Stats">
          <p>Toplam Görev: {todos.length} | Tamamlanan Görev: {todos.filter(todo => todo.completed).length}</p>
          <button className="clear-btn" onClick={clearAllTodos}>Tümünü Temizle</button>
        </div>
      )}
    </div>   
  )
}

export default App;
