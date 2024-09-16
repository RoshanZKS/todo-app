import React, { useState, useEffect } from "react";

const TodoApp = () => {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [editingText, setEditingText] = useState("");

  // Fetch todos from the API
  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/todos?_start=0&_limit=10")
      .then((response) => response.json())
      .then((data) => setTodos(data));
  }, []);

  // Add a new todo
  const addTodo = () => {
    const newId = todos.length + 1;
    const newTodoObj = {
      id: newId,
      title: newTodo,
      completed: false,
    };
    setTodos([...todos, newTodoObj]);
    setNewTodo("");
  };

  // Update todo completion status
  const toggleTodo = (id) => {
    const updatedTodos = todos.map((todo) => {
      if (todo.id === id) {
        return {
          ...todo,
          completed: !todo.completed,
        };
      }
      return todo;
    });
    setTodos(updatedTodos);
  };

  // Delete a todo
  const deleteTodo = (id) => {
    const updatedTodos = todos.filter((todo) => todo.id !== id);
    setTodos(updatedTodos);
  };

  // Start editing a todo
  const startEditing = (id, text) => {
    setEditingId(id);
    setEditingText(text);
  };

  // Save edited todo
  const saveEditedTodo = () => {
    const updatedTodos = todos.map((todo) => {
      if (todo.id === editingId) {
        return {
          ...todo,
          title: editingText,
        };
      }
      return todo;
    });
    setTodos(updatedTodos);
    setEditingId(null);
    setEditingText("");
  };

  return (
    <div className='container'>
    <div className='app-wrapper'>
      <div className='header'>
        <h1>ToDo App</h1>
      </div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          addTodo();
        }}
      >
        <input
          type="text"
          value={newTodo}
          className='task-input'
          onChange={(e) => setNewTodo(e.target.value)}
          placeholder="Add a new todo"
        />
        <button className='button-add' type="submit">Add</button>
      </form>
      <ul>
        {todos.map((todo) => (
          <li className='list-item' key={todo.id}>
            {editingId === todo.id ? (
              <>
                <input
                  type="text"
                  value={editingText}
                  className='list'
                  onChange={(e) => setEditingText(e.target.value)}
                />
                <button className='button-edit task-button' onClick={saveEditedTodo}>Save</button>
              </>
            ) : (
              <>
                <input
                  type="checkbox"
                  checked={todo.completed}
                  className='button-complete task-button'
                  onChange={() => toggleTodo(todo.id)}
                />
                <span className='list'
                  style={{
                    textDecoration: todo.completed ? "line-through" : "none",
                  }}
                >
                  {todo.title}
                </span>
                <button className='button-edit task-button'  onClick={() => startEditing(todo.id, todo.title)}>
                  Edit
                </button>
                <button className='button-delete task-button' onClick={() => deleteTodo(todo.id)}>Delete</button>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
    </div>
  );
};

export default TodoApp;