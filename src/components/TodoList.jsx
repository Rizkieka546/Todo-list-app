import React from "react";
import { useTodosState, useTodosDispatch } from "../context/TodosContext";
import TodoItem from "./TodoItem";

export default function TodoList() {
  const { todos } = useTodosState();
  const dispatch = useTodosDispatch();

  if (!todos || todos.length === 0) {
    return <p className="text-[#912f56]">Belum ada tugas — tambahkan yang baru.</p>;
  }

  return (
    <ul className="space-y-2" role="list" aria-label="Daftar todo">
      {todos.map((t) => (
        <TodoItem
          key={t.id}
          todo={t}
          onToggle={() => dispatch({ type: "TOGGLE", payload: t.id })}
          onDelete={() => dispatch({ type: "DELETE", payload: t.id })}
        />
      ))}
    </ul>
  );
}
