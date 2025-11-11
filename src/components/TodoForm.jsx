import React, { useState } from "react";
import { useTodosDispatch } from "../context/TodosContext";
import { escapeHtml } from "../utils/sanitize";

export default function TodoForm() {
  const dispatch = useTodosDispatch();
  const [text, setText] = useState("");
  const [error, setError] = useState("");

  function validate(input) {
    const trimmed = input.trim();
    if (!trimmed) return "Isi todo tidak boleh kosong.";
    if (trimmed.length > 200) return "Maksimum 200 karakter.";
    // optional: block script-like patterns
    if (/(<script|<\/script|\bon\w+\=)/i.test(trimmed)) {
      return "Input mengandung karakter yang tidak diperbolehkan.";
    }
    return null;
  }

  function handleSubmit(e) {
    e.preventDefault();
    const err = validate(text);
    if (err) {
      setError(err);
      return;
    }
    setError("");
    const cleanText = escapeHtml(text.trim());

    const newTodo = {
      id: Date.now(),
      text: cleanText,
      completed: false
    };

    dispatch({ type: "ADD", payload: newTodo });
    setText("");
  }

  return (
    <form onSubmit={handleSubmit} className="mb-4">
      <div className="flex gap-2">
        <label htmlFor="todo-input" className="sr-only">Tambah Todo</label>
        <input
          id="todo-input"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Contoh: Beli bahan makanan..."
          className="flex-1 border border-gray-200 p-2 text-[#912f56] rounded focus:outline-none focus:ring-2 focus:ring-[#912f56]"
          aria-invalid={!!error}
          aria-describedby={error ? "todo-error" : undefined}
        />
        <button
          type="submit"
          className="px-4 py-2 bg-[#912f56] text-white rounded hover:bg-[#912f56] focus:outline-none focus:ring-2 focus:ring-[#912f56]"
        >
          Add
        </button>
      </div>
      {error && (
        <p id="todo-error" className="mt-2 text-sm text-red-600" role="alert">
          {error}
        </p>
      )}
    </form>
  );
}
