import React, { useState, useEffect } from 'react';
import AddTodo from './components/AddTodo';
import TodoList from './components/TodoList';

function App() {
  const [todos, setTodos] = useState(() => {
    const savedTodos = localStorage.getItem('todos');
    return savedTodos ? JSON.parse(savedTodos) : [];
  });
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  const addTodo = (text) => {
    const newTodo = {
      id: Date.now(),
      text,
      completed: false,
      createdAt: new Date().toLocaleDateString(),
    };
    setTodos((prev) => [newTodo, ...prev]);
  };

  const toggleComplete = (id) => {
    setTodos((prev) =>
      prev.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const deleteTodo = (id) => {
    setTodos((prev) => prev.filter((todo) => todo.id !== id));
  };

  const editTodo = (id, newText) => {
    setTodos((prev) =>
      prev.map((todo) => (todo.id === id ? { ...todo, text: newText } : todo))
    );
  };

  const activeCount = todos.filter((t) => !t.completed).length;
  const completedCount = todos.filter((t) => t.completed).length;

  return (
    <div className="app-container">
      <div className="app-header">
        <h1>📝 To-Do List</h1>
        <div className="task-counter">
          {todos.length === 0
            ? 'Start by adding a new task'
            : `${activeCount} active, ${completedCount} completed`}
        </div>
      </div>

      <AddTodo onAddTodo={addTodo} />

      <TodoList
        todos={todos}
        filter={filter}
        onToggleComplete={toggleComplete}
        onDelete={deleteTodo}
        onEdit={editTodo}
        onSetFilter={setFilter}
      />

    </div>
  );
}

export default App;
