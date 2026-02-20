import React, { useState, useEffect } from 'react';
import FileUpload from './FileUpload';
import { getTasks, addTask, deleteTask, removeToken } from '../services/api';
import './Dashboard.css';

function Dashboard({ onLogout }) {
    const [tasks, setTasks] = useState([]);
    const [newTaskTitle, setNewTaskTitle] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadTasks();
    }, []);

    const loadTasks = async () => {
        try {
            const data = await getTasks();
            setTasks(data);
            setLoading(false);
        } catch (err) {
            console.error('Error loading tasks:', err);
            setLoading(false);
        }
    };

    const handleAddTask = async (e) => {
        e.preventDefault();
        if (!newTaskTitle.trim()) return;

        try {
            const newTask = await addTask(newTaskTitle);
            setTasks([...tasks, newTask]);
            setNewTaskTitle('');
        } catch (err) {
            console.error('Error adding task:', err);
        }
    };

    const handleDeleteTask = async (taskId) => {
        try {
            await deleteTask(taskId);
            setTasks(tasks.filter(task => task.id !== taskId));
        } catch (err) {
            console.error('Error deleting task:', err);
        }
    };

        const handleToggleTask = async (taskId, currentStatus) => {
        try {
            const newStatus = currentStatus === 'todo' ? 'done' : 'todo';
            const token = localStorage.getItem('token');
            // Wywołujemy nasze API
            await fetch(`http://localhost:5000/tasks/${taskId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({ status: newStatus })
            });
            // Aktualizujemy listę na ekranie
            setTasks(tasks.map(task => task.id === taskId ? {...task, status: newStatus} : task));
        } catch (err) {
            console.error('Error updating task:', err);
        }
    };

    const handleLogout = () => {
        removeToken();
        onLogout();
    };

    if (loading) {
        return <div className="loading">Ładowanie...</div>;
    }

    return (
           <div className="dashboard">
            <div className="dashboard-header">
                <h1>📋 Moje Zadania</h1>
                <button onClick={handleLogout} className="logout-btn">Wyloguj</button>
            </div>


            <div className="add-task-form">
                <form onSubmit={handleAddTask}>
                    <input
                        type="text"
                        placeholder="Dodaj nowe zadanie..."
                        value={newTaskTitle}
                        onChange={(e) => setNewTaskTitle(e.target.value)}
                    />
                    <button type="submit">➕ Dodaj</button>
                </form>
            </div>

            {/* Upload plików do S3 */}
            <FileUpload />

            <div className="tasks-container">
                {tasks.length === 0 ? (
                    <div className="no-tasks">
                        <p>Brak zadań. Dodaj swoje pierwsze zadanie!</p>
                    </div>
                ) : (
                    <div className="tasks-list">
                        {tasks.map(task => (
                            <div key={task.id} className="task-item">
                                <div className="task-content">
                                    <h3>{task.title}</h3>
                                    <span 
                                        className={`status-badge status-${task.status}`} 
                                        onClick={() => handleToggleTask(task.id, task.status)}
                                        style={{cursor: 'pointer'}}
                                    >
                                        {task.status}
                                    </span>
                                </div>
                                <button 
                                    onClick={() => handleDeleteTask(task.id)}
                                    className="delete-btn"
                                >
                                    🗑️
                                </button>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            <div className="stats">
                <div className="stat-card">
                    <h4>Wszystkich zadań</h4>
                    <p>{tasks.length}</p>
                </div>
                <div className="stat-card">
                    <h4>Do zrobienia</h4>
                    <p>{tasks.filter(t => t.status === 'todo').length}</p>
                </div>
            </div>
        </div>
    );
}

export default Dashboard;