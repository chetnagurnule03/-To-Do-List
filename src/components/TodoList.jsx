import React from 'react';
import TodoItem from './TodoItem';

function TodoList({ todos, filter, onToggleComplete, onDelete, onEdit, onSetFilter }) {

  const filteredTodos = todos.filter((todo) => {
    if (filter === 'active') return !todo.completed;
    if (filter === 'completed') return todo.completed;
    return true;
  });

  const getEmptyMessage = () => {
    if (filter === 'completed') return 'No completed tasks yet.';
    if (filter === 'active') return 'No active tasks. Great job!';
    return 'No tasks yet. Add one above!';
  };

  return (
    <div>
      <div className="filter-buttons">
        {['all', 'active', 'completed'].map((f) => (
          <button
            key={f}
            className={`filter-button ${filter === f ? 'active' : ''}`}
            onClick={() => onSetFilter(f)}
          >
            {f.charAt(0).toUpperCase() + f.slice(1)}
          </button>
        ))}
      </div>

      {filteredTodos.length === 0 ? (
        <div className="empty-state">
          <div className="empty-state-icon">📝</div>
          <div className="empty-state-text">{getEmptyMessage()}</div>
        </div>
      ) : (
        <ul className="todo-list">
          {filteredTodos.map((todo) => (
            <TodoItem
              key={todo.id}
              todo={todo}
              onToggleComplete={onToggleComplete}
              onDelete={onDelete}
              onEdit={onEdit}
            />
          ))}
        </ul>
      )}
    </div>
  );
}

export default TodoList;
