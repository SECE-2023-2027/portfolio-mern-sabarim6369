import React, { useState } from 'react';
import './App.css';

const App = () => {
  const [task, setTask] = useState('');
  const [tasks, setTasks] = useState([]);

  const handleAddTask = () => {
    if (task.trim()) {
      setTasks([...tasks, { text: task, isCompleted: false }]);
      setTask('');
    }
  };

  const handleDeleteTask = (index) => {
    const updatedTasks = tasks.filter((_, i) => i !== index);
    setTasks(updatedTasks);
  };

  const handleToggleCompletion = (index) => {
    const updatedTasks = tasks.map((task, i) =>
      i === index ? { ...task, isCompleted: !task.isCompleted } : task
    );
    setTasks(updatedTasks);
  };

  const handleEditTask = (index) => {
    const updatedTasks = tasks.map((task, i) =>
      i === index ? { ...task, isEditing: true } : task
    );
    setTasks(updatedTasks);
  };

  const handleSaveTask = (index, newText) => {
    const updatedTasks = tasks.map((task, i) =>
      i === index ? { ...task, text: newText, isEditing: false } : task
    );
    setTasks(updatedTasks);
  };

  const handleClearAll = () => {
    setTasks([]);
  };

  return (
    <div className="todo-container">
      <h1 className="header">To-Do List</h1>
      <div className="input-container">
        <input
          type="text"
          value={task}
          onChange={(e) => setTask(e.target.value)}
          placeholder="Enter a task"
        />
        <button onClick={handleAddTask}>Add Task</button>
      </div>

      {tasks.length > 0 && (
        <button className="clear-all" onClick={handleClearAll}>
          Clear All Tasks
        </button>
      )}

      <ul>
        {tasks.map((task, index) => (
          <li key={index} className={task.isCompleted ? 'completed' : ''}>
            {task.isEditing ? (
              <div className="edit-task">
                <input
                  type="text"
                  defaultValue={task.text}
                  onBlur={(e) => handleSaveTask(index, e.target.value)}
                  autoFocus
                />
              </div>
            ) : (
              <span
                onClick={() => handleToggleCompletion(index)}
                className="task-text"
              >
                {task.text}
              </span>
            )}
            <div className="actions">
              <button
                onClick={() => handleEditTask(index)}
                className="edit-btn"
              >
                Edit
              </button>
              <button
                onClick={() => handleDeleteTask(index)}
                className="delete-btn"
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
