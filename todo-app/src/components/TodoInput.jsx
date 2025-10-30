function TodoInput({value, onChange, onAdd, onKeyPress}) {
    return (
        <div className='input-container'>
            <input 
                type= "text"
                placeholder="Yeni görev ekle..."
                value={value}
                onChange={onChange}  
                onKeyUp={onKeyPress}
            />
            <button onClick={onAdd}>Ekle</button>
        </div>
    );
}

export default TodoInput;