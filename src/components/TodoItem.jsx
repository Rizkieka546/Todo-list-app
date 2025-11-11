import React from "react";

export default function TodoItem({ todo, onToggle, onDelete }) {
  return (
    <li className="flex items-center justify-between bg-[#912f56] p-3 rounded shadow-sm">
      <div className="flex items-center gap-3">
        <input
          id={`chk-${todo.id}`}
          type="checkbox"
          checked={!!todo.completed}
          onChange={onToggle}
          className="w-4 h-4"
          aria-label={`Tandai ${todo.text} selesai`}
        />
        <label
          htmlFor={`chk-${todo.id}`}
          className={`select-none cursor-pointer ${todo.completed ? "line-through text-gray-400" : "text-[#eaf2ef]"}`}
        >
          {todo.text}
        </label>
      </div>

      <div className="flex items-center gap-2">
        <button
          onClick={onDelete}
          className="text-sm text-[#eaf2ef] hover:text-[#eaf2ef] focus:outline-none focus:ring-2 focus:ring-red-200 rounded px-2 py-1"
          aria-label={`Hapus ${todo.text}`}
        >
          Delete
        </button>
      </div>
    </li>
  );
}
