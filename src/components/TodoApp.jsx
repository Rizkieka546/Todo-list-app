import React from "react";
import { TodosProvider } from "../context/TodosContext";
import TodoList from "./TodoList";
import TodoForm from "./TodoForm";

export default function TodoApp() {
  return (
    <TodosProvider>
      <div className="min-h-screen bg-[#912f56] flex items-center justify-center p-6">
        <div className="w-full max-w-xl bg-[#eaf2ef] shadow-2xl rounded-2xl p-6">
          <header className="mb-4">
            <h1 className="text-2xl font-extrabold text-[#912f56]">Todo List</h1>
            <p className="text-sm text-[#912f56]">Simple, accessible & secure-by-default</p>
          </header>

          <main>
            <TodoForm />
            <TodoList />
          </main>
        </div>
      </div>
    </TodosProvider>
  );
}
