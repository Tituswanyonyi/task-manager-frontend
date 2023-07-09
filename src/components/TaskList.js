import React, { useState, useEffect } from 'react';
import TaskDetails from './TaskDetails';
import '../css/TaskList.css';
import TaskCreationForm from './TaskCreationForm';
import UpdateForm from './UpdateForm';

const TaskList = () => {
    const [tasks, setTasks] = useState([]);
    const [selectedTask, setSelectedTask] = useState(null);
    const [showNewTaskForm, setShowNewTaskForm] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [successMessage, setSuccessMessage] = useState(null);
    const [errorMessage, setErrorMessage] = useState(null);
    const [showUpdateModal, setShowUpdateModal] = useState(false);
    const [showTaskDetails, setShowTaskDetails] = useState(false);
    const [statusFilter, setStatusFilter] = useState('');

    const fetchTasks = async () => {
        const token = localStorage.getItem('token');
        console.log('access token:', token);

        try {
            const response = await fetch('https://taskmanger.onrender.com/api/tasks', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
            });
            const data = await response.json();
            if (response.ok) {
                setSuccessMessage(data.message);
                setErrorMessage('');
                setTasks(data);
            } else {
                setSuccessMessage(data.error);
                setErrorMessage('');
                // Handle the error
            }
        } catch (error) {
            setErrorMessage('An error occurred. Please try again.');
            setSuccessMessage('');
            // Handle the error
        }
    };

    useEffect(() => {
        fetchTasks();
    }, []);
    const handleViewTask = (task) => {
        setSelectedTask(task);
        setShowTaskDetails(true);
    };

    const updateTaskList = async () => {
        await fetchTasks();
      };
    const handleCloseDetails = () => {
        setSelectedTask(null);
    };
    const handleToggleNewTaskForm = () => {
        setShowNewTaskForm(!showNewTaskForm);
    };

    const handleUpdateTask = (taskId) => {
        const taskToUpdate = tasks.find((task) => task.id === taskId);
        setSelectedTask(taskToUpdate);
        setShowUpdateModal(true); // Open the UpdateForm as a modal
    };


    const handleUpdateFormSubmit = async (updatedTask) => {
        const token = localStorage.getItem('token');
        try {
            const response = await fetch(`https://taskmanger.onrender.com/api/tasks/${updatedTask.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(updatedTask),
            });

            if (response.ok) {
                const data = await response.json();
                setSuccessMessage(data.message); // Set success message
                setErrorMessage(null); // Clear error message
                fetchTasks(); // Fetch updated task list
                setShowUpdateModal(false); // Close the update modal
            } else {
                const errorData = await response.json();
                throw new Error(errorData.message);
            }
        } catch (error) {
            setErrorMessage(error.message); // Set error message
            setSuccessMessage(null); // Clear success message
        }
    };


    const handleCreateTask = async (task) => {
        const token = localStorage.getItem('token');
        try {
            const response = await fetch(`https://taskmanger.onrender.com/api/tasks`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(task),
            });

            if (response.ok) {
                const data = await response.json();
                setSuccessMessage('Task created successfully.'); // Set success message
                setErrorMessage(null); // Clear error message
                fetchTasks(); // Fetch updated task list
                handleToggleNewTaskForm();
            } else {
                const errorData = await response.json();
                throw new Error(errorData.message);
            }
        } catch (error) {
            setErrorMessage(error.message); // Set error message
            setSuccessMessage(null); // Clear success message
        }
    };
    const handleCreateTaskClick = () => {
        setShowModal(true);
    };
    const handleDeleteTask = async (taskId) => {
        const token = localStorage.getItem('token');
        try {
            const response = await fetch(`https://taskmanger.onrender.com/api/tasks/${taskId}`, {
                method: 'DELETE',
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            if (response.ok) {
                const updatedTasks = tasks.filter((task) => task.id !== taskId);
                setTasks(updatedTasks);
            } else {
            }
        } catch (error) {
        }
    };
    const handleStatusFilterChange = (e) => {
        setStatusFilter(e.target.value);
    };
    const filteredTasks = statusFilter
        ? tasks.filter((task) => task.status === statusFilter)
        : tasks;
    return (
        <div className="task-list-container">
            <h2>My Tasks</h2>
            {successMessage && <div className="success-message">{successMessage}</div>}
            {errorMessage && <div className="error-message">{errorMessage}</div>}

            {showModal && (
                <div className="task-creation-form-modal">
                    <div className="task-creation-form-container">
                        <TaskCreationForm
                            onCreateTask={handleCreateTask}
                            onCancel={() => setShowModal(false)}
                        />
                    </div>
                </div>
            )}

            {showUpdateModal && (
                <div className="modal-container">
                    <div className="modal-content">
                        <UpdateForm
                            task={selectedTask}
                            onUpdateTask={handleUpdateFormSubmit}
                            onClose={() => setShowUpdateModal(false)}
                        />
                    </div>
                </div>
            )}
            <div className="task-list-filter">
                <label htmlFor="statusFilter">Filter by
                    Status:</label>
                <select
                    id="statusFilter"
                    value={statusFilter}
                    onChange={handleStatusFilterChange}
                >
                    <option value="">All</option>
                    <option value="InProgress">InProgress</option>
                    <option value="Complete">Complete</option>
                    <option value="Incomplete">Incomplete</option>
                    <option value="Todo">Todo</option>
                </select>
            </div>
            <button className="create-task-btn" onClick={handleCreateTaskClick}>
                Create Task
            </button>
            {selectedTask ? (
                <TaskDetails task={selectedTask} onClose={handleCloseDetails} updateTaskList={updateTaskList}  />
            ) : (
                <table className="task-list-table">
                    <thead>
                        <tr>
                            <th>Title</th>
                            <th>Description</th>
                            <th>Status</th>
                            <th>Due Date</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredTasks.map((task) => (
                            <tr key={task.id}>
                                <td>{task.title}</td>
                                <td>{task.description}</td>
                                <td>
                                    <span
                                        className={`status-text ${task.status && task.status.toLowerCase()
                                            }-status`}
                                    >
                                        {task.status}
                                    </span>
                                </td>
                                <td>{task.due_date}</td>
                                <td>
                                    <div className="button-group">
                                        <button
                                            className="action-btn view-btn"
                                            onClick={() => handleViewTask(task)}
                                        >
                                            View
                                        </button>
                                        <button
                                            className="action-btn delete-btn"
                                            onClick={() => handleDeleteTask(task.id)}
                                        >
                                            Delete
                                        </button>
                                        <button
                                            className="action-btn update-btn"
                                            onClick={() => handleUpdateTask(task.id)}
                                        >
                                            Update
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default TaskList;
