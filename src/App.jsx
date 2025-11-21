import { useState } from "react";

export default function TodoApp() {
  const [todos, setTodos] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [editing, setEditing] = useState({ isEditing: false, id: null, text: "" });

  const addTodo = (e) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    const newTodo = {
      id: Date.now(),
      text: inputValue,
      completed: false
    }

    setTodos([...todos, newTodo])
    setInputValue("");
  }

  const setToggle = (id) => {
    const updateTodos = todos.map((todo) => 
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    )
    setTodos(updateTodos)
  }

  const deleteTodo = (id) => {
    if (!confirm('Apakah anda ingin menghapus todo ini?')) return;
    const updateTodos = todos.filter(todo => todo.id !== id);
    setTodos(updateTodos)
  }

  // Fungsi untuk memulai edit - lebih sederhana
  const startEdit = (todo) => {
    setEditing({ isEditing: true, id: todo.id, text: todo.text });
  }

  // Fungsi untuk menyimpan edit
  const saveEdit = () => {
    if (!editing.text.trim()) {
      cancelEdit();
      return;
    }

    const updateTodos = todos.map((todo) =>
      todo.id === editing.id ? { ...todo, text: editing.text } : todo
    )
    setTodos(updateTodos);
    cancelEdit();
  }

  // Fungsi untuk membatalkan edit
  const cancelEdit = () => {
    setEditing({ isEditing: false, id: null, text: "" });
  }

  // Handle key press saat edit
  const handleEditKeyPress = (e) => {
    if (e.key === 'Enter') {
      saveEdit();
    } else if (e.key === 'Escape') {
      cancelEdit();
    }
  }

  return (
    <div className="min-h-screen w-full flex justify-center items-center bg-gray-50">
      <div className="p-4 border bg-white rounded-xl shadow-lg flex flex-col space-y-3 w-[400px]">

        <h1 className="text-2xl font-semibold text-center mb-2">
          {editing.isEditing ? "Edit Todo" : "Todo App"}
        </h1>

        {/* Form Input - berubah berdasarkan mode */}
        <div className="flex space-x-2">
          {editing.isEditing ? (
            // Mode Edit - Input untuk mengedit
            <>
              <input
                className="flex-1 py-2 px-3 rounded border focus:outline-none focus:ring-2 focus:ring-green-400"
                value={editing.text}
                onChange={(e) => setEditing({ ...editing, text: e.target.value })}
                onKeyDown={handleEditKeyPress}
                autoFocus
                placeholder="Edit todo..."
              />
              <button
                className="bg-green-600 text-white px-3 rounded hover:bg-green-700 transition"
                onClick={saveEdit}
              >
                Simpan
              </button>
              <button
                className="bg-gray-500 text-white px-3 rounded hover:bg-gray-600 transition"
                onClick={cancelEdit}
              >
                Batal
              </button>
            </>
          ) : (
            // Mode Normal - Input untuk menambah
            <>
              <input
                className="flex-1 py-2 px-3 rounded border focus:outline-none focus:ring-2 focus:ring-blue-400"
                placeholder="tambah todo..."
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && addTodo(e)}
              />
              <button
                className="bg-blue-600 text-white px-3 rounded hover:bg-blue-700 transition"
                onClick={addTodo}
              >
                Tambah
              </button>
            </>
          )}
        </div>

        {/* Daftar Todo */}
        <div className="space-y-2 mt-4 max-h-60 overflow-y-auto">
          {todos.map(todo => (
            <div
              key={todo.id}
              className={`flex items-center justify-between px-3 py-2 rounded-lg transition ${
                editing.isEditing && editing.id === todo.id 
                  ? "bg-green-100 border border-green-300" 
                  : "bg-gray-100 hover:bg-gray-200"
              }`}
            >
              <div className="flex items-center flex-1">
                {/* Checkbox */}
                <input
                  type="checkbox"
                  className="mr-3"
                  checked={todo.completed}
                  onChange={() => setToggle(todo.id)}
                  disabled={editing.isEditing}
                />
                
                {/* Todo Text */}
                <div
                  className={`flex-1 cursor-pointer ${todo.completed ? "line-through text-gray-500" : ""}`}
                  onClick={() => !editing.isEditing && setToggle(todo.id)}
                >
                  {todo.text}
                </div>
              </div>

              {/* Action Buttons */}
              {!editing.isEditing && (
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => startEdit(todo)}
                    className="text-sm text-green-500 hover:text-green-700 transition px-2 py-1 rounded hover:bg-green-50"
                    disabled={todo.completed}
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => deleteTodo(todo.id)}
                    className="text-sm text-red-500 hover:text-red-700 transition px-2 py-1 rounded hover:bg-red-50"
                  >
                    Hapus
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Info & Statistics */}
        <div className="text-center text-sm text-gray-500 mt-4 pt-3 border-t">
          <div className="flex justify-between mb-2">
            <span>Total: {todos.length}</span>
            <span>Selesai: {todos.filter(todo => todo.completed).length}</span>
            <span>Belum: {todos.filter(todo => !todo.completed).length}</span>
          </div>
          <p className="text-xs">
            {editing.isEditing 
              ? "💡 Tekan Enter untuk simpan, Escape untuk batal" 
              : "💡 Klik teks untuk toggle, klik Edit untuk mengubah"
            }
          </p>
        </div>
      </div>
    </div>
  );
}