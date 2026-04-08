import React, { useEffect, useState } from 'react';
import { Trash2, CheckCircle2, Circle, XSquare } from 'lucide-react';
import './TodoUI.css';

const API_BASE = "/api";

const TodoUI = () => {
  const [activeTab, setActiveTab] = useState('Personal');
  const [input, setInput] = useState('');
  const [todos, setTodos] = useState([]);
  const [error, setError] = useState('');

  const loadTodos = async (showConnectionError = true) => {
    try {
      const res = await fetch(`${API_BASE}/tasks`);
      if (!res.ok) throw new Error('Failed to load tasks');
      const data = await res.json();
      setTodos(
        Array.isArray(data)
          ? data.map((task) => ({ ...task, category: task.category || 'Personal' }))
          : []
      );
      setError('');
    } catch (err) {
      if (showConnectionError) {
        setError('Cannot connect to backend. Check server and MongoDB.');
      }
    }
  };

  useEffect(() => {
    loadTodos();
    const pollId = setInterval(() => {
      loadTodos(false);
    }, 3000);

    return () => clearInterval(pollId);
  }, []);

  const addTodo = async () => {
    if (!input.trim()) return;
    setError('');

    try {
      const res = await fetch(`${API_BASE}/add`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: input.trim(), category: activeTab })
      });

      if (!res.ok) throw new Error('Failed to add task');

      const data = await res.json();
      setTodos((prev) => [...prev, { ...data.task, category: data.task.category || activeTab }]);
      setInput('');
      loadTodos(false);
    } catch (err) {
      setError('Unable to add task right now.');
    }
  };

  const toggleTodo = async (id) => {
    setError('');
    try {
      const res = await fetch(`${API_BASE}/toggle/${id}`, { method: 'PATCH' });
      if (!res.ok) throw new Error('Failed to toggle task');
      const updatedTask = await res.json();
      setTodos((prev) => prev.map((t) => (t._id === id ? { ...updatedTask, category: updatedTask.category || t.category || 'Personal' } : t)));
      loadTodos(false);
    } catch (err) {
      setError('Unable to update task status.');
    }
  };

  const deleteTodo = async (id) => {
    setError('');
    try {
      const res = await fetch(`${API_BASE}/delete/${id}`, { method: 'DELETE' });
      if (!res.ok) throw new Error('Failed to delete task');
      setTodos((prev) => prev.filter((t) => t._id !== id));
      loadTodos(false);
    } catch (err) {
      setError('Unable to delete task.');
    }
  };

  const clearCompleted = async () => {
    setError('');
    const completedInTab = todos.filter((t) => t.category === activeTab && t.completed);

    try {
      await Promise.all(
        completedInTab.map((t) => fetch(`${API_BASE}/delete/${t._id}`, { method: 'DELETE' }))
      );
      setTodos((prev) => prev.filter((t) => !(t.category === activeTab && t.completed)));
      loadTodos(false);
    } catch (err) {
      setError('Unable to clear completed tasks.');
    }
  };

  const filteredTodos = todos.filter(t => t.category === activeTab);

  return (
    <div className="todo-shell">
      
      <div className="todo-header">
        <h1 className="todo-head-left">TO</h1>
        <div className="todo-head-right-wrap">
          <h1 className="todo-head-right">DO</h1>
          <CheckCircle2 className="todo-head-icon" size={32} strokeWidth={3} />
        </div>
      </div>

      <div className="todo-tabs">
        {['Personal', 'Professional'].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`todo-tab ${
              activeTab === tab 
              ? 'is-active' 
              : ''
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      <div className="todo-input-row">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') addTodo();
          }}
          placeholder="What do you need to do?"
          className="todo-input"
        />
        <button 
          onClick={addTodo}
          className="todo-add-btn"
        >
          ADD
        </button>
      </div>

      {error && <p className="todo-error">{error}</p>}

      <div className="todo-card">
        <div className="todo-items-wrap">
          {filteredTodos.length === 0 && (
            <p className="todo-empty">No tasks in this tab yet.</p>
          )}

          {filteredTodos.map((todo) => (
            <div key={todo._id} className="todo-item-row">
              <div 
                className="todo-main-action"
                onClick={() => toggleTodo(todo._id)}
              >
                {todo.completed ? (
                  <CheckCircle2 className="todo-check done" size={28} />
                ) : (
                  <Circle className="todo-check" size={28} />
                )}
                <span className={`todo-text ${todo.completed ? 'is-done' : ''}`}>
                  {todo.text}
                </span>
              </div>
              <button onClick={() => deleteTodo(todo._id)} className="todo-delete-btn">
                <Trash2 size={20} />
              </button>
            </div>
          ))}
        </div>

        <div className="todo-actions">
          <button 
            onClick={clearCompleted}
            className="todo-clear-btn"
          >
            <XSquare size={20} />
            Clear Completed 23
          </button>
        </div>
      </div>
    </div>
  );
};

export default TodoUI;