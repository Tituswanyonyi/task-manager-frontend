import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../css/TaskDetails.css';

const TaskDetails = ({ task, onClose }) => {
  const navigate = useNavigate();
  const [successMessage, setSuccessMessage] = useState(null);
  const getStatusColor = (status) => {
    switch (status) {
      case 'Complete':
        return '#4CAF50';
      case 'Incomplete':
        return '#F44336';
      case 'InProgress':
        return '#FFC107';
      default:
        return '#000000';
    }
  };
  const handleBackToTaskList = () => {
    navigate('/tasklist');
  };

  const handleCompleteTask = async () => {
    const token = localStorage.getItem('token');
    try {
      const response = await fetch(`http://127.0.0.1:5000/api/tasks/${task.id}/complete`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setSuccessMessage(data.message);
      } else {
        throw new Error('Failed to mark the task as complete.');
      }
    } catch (error) {
      console.log(error.message); // Handle error message
    }
  };
  const handleInCompleteTask = async () => {
    const token = localStorage.getItem('token');
    try {
      const response = await fetch(`http://127.0.0.1:5000/api/tasks/${task.id}/incomplete`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setSuccessMessage(data.message);
      } else {
        throw new Error('Failed to mark the task as in complete.');
      }
    } catch (error) {
      console.log(error.message); // Handle error message
    }
  };
  const renderButtons = () => {
    if (task.status === 'Complete') {
      return null;
    } else if (task.status === 'InProgress') {
      return (
        <>
          <button className="action-btn complete-btn" onClick={handleCompleteTask}>
            Complete
          </button>
          <button className="action-btn assign-btn">Assign</button>
          <button className="action-btn incomplete-btn"onClick={handleInCompleteTask}>Mark as Incomplete</button>
        </>
      );
    } else {
      return (
        <>
          <button className="action-btn complete-btn" onClick={handleCompleteTask}>
            Complete
          </button>
          <button className="action-btn assign-btn">Assign</button>
        </>
      );
    }
  };

  return (
    <div className="task-details-container">
      <div className="task-details-header">
        <h2>Task Details</h2>
      </div>
      <div className="task-details-content">
      {successMessage && <div className="success-message">{successMessage}</div>}
        <div className="task-details-row">
          <div className="task-details-label">Title:</div>
          <div className="task-details-value">{task.title}</div>
        </div>
        <div className="task-details-row">
          <div className="task-details-label">Description:</div>
          <div className="task-details-value">{task.description}</div>
        </div>
        <div className="task-details-row">
          <div className="task-details-label">Status:</div>
          <div className="task-details-value">
            <span
              className="status-text"
              style={{ backgroundColor: getStatusColor(task.status) }}
            >
              {task.status}
            </span>
          </div>
        </div>
        <div className="task-details-row">
          <div className="task-details-label">Created At:</div>
          <div className="task-details-value">{task.created_at}</div>
        </div>
        <div className="task-details-row">
          <div className="task-details-label">Due Date:</div>
          <div className="task-details-value">{task.due_date}</div>
        </div>
        <div className="task-details-actions">{renderButtons()}</div>
      </div>
      <div className="back-to-tasklist">
        <button className="back-btn" onClick={onClose}>
          Back to Task List
        </button>
      </div>
    </div>
  );
};

export default TaskDetails;
