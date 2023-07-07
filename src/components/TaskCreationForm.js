import React, { useState } from 'react';
import '../css/TaskForm.css';

const TaskCreationForm = ({ onCreateTask, onCancel }) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [status, setStatus] = useState('');
    const [dueDate, setDueDate] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();

        // Create the task object
        const task = {
            title,
            description,
            status,
            due_date: dueDate,
        };

        // Call the onCreateTask callback with the task object
        onCreateTask(task);

        // Reset the form
        setTitle('');
        setDescription('');
        setStatus('');
        setDueDate('');

        // Close the modal
    };

    return (
        <div className="task-creation-form-modal">
            <div className="task-creation-form-container">
                <h2>Create Task</h2>
                <form onSubmit={handleSubmit} className="task-creation-form">
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
                            <option value="">Select Status</option>
                            <option value="InProgress">InProgress</option>
                            <option value="Complete">Complete</option>
                            <option value="Incomplete">Incomplete</option>
                            <option value="Todo">Todo</option>
                        </select>
                    </div>
                    <div className="form-group">
                        <label htmlFor="dueDate">Due Date:</label>
                        <input
                            type="date"
                            id="dueDate"
                            value={dueDate}
                            onChange={(e) => setDueDate(e.target.value)}
                            className="form-input"
                        />
                    </div>
                    <div className="form-buttons">
                        <button type="submit" className="form-submit-btn">Create Task</button>
                        <button type="button" className="form-cancel-btn" onClick={onCancel}>Cancel</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default TaskCreationForm;
