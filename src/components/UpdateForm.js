import React, { useState, useEffect } from 'react';
import './UpdateForm.css';

const UpdateForm = ({ task, onUpdateTask, onClose }) => {
  const [title, setTitle] = useState(task.title);
  const [description, setDescription] = useState(task.description);
  const [status, setStatus] = useState(task.status);

  const handleSubmit = (e) => {
    e.preventDefault();
    onUpdateTask({
      id: task.id,
      title,
      description,
      status,
    });
  };

  useEffect(() => {
    // Set the form fields when the task prop changes
    setTitle(task.title);
    setDescription(task.description);
    setStatus(task.status);
  }, [task]);

  return (
    <div className="update-form-modal">
      <div className="update-form-container">
        <h2>Update Task</h2>
        <form onSubmit={handleSubmit} className="update-form">
          <div className="form-group">
            <label htmlFor="title">Title:</label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="form-input"
            />
          </div>
          <div className="form-group">
            <label htmlFor="description">Description:</label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="form-textarea"
            ></textarea>
          </div>
          <div className="form-group">
            <label htmlFor="status">Status:</label>
            <select
              id="status"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="form-input"
            >
              <option value="InProgress">InProgress</option>
              <option value="Todo">Todo</option>
              <option value="Complete">Complete</option>
              <option value="Incomplete">Incomplete</option>
            </select>
          </div>
          <div className="form-buttons">
            <button type="submit">Update</button>
            <button type="button" onClick={onClose}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateForm;
