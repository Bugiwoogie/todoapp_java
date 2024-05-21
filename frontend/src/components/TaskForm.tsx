import React, { useState } from 'react';
import axios from 'axios';
import { Task } from '../types/Task';

interface TaskFormProps {
    task: Task;
    setTask: React.Dispatch<React.SetStateAction<Task>>;
    fetchTasks: () => void;
}

const TaskForm: React.FC<TaskFormProps> = ({ task, setTask, fetchTasks }) => {
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setTask(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (task.id) {
            axios.put(`/api/tasks/${task.id}`, task)
                .then(() => {
                    fetchTasks();
                    setTask({ id: 0, title: '', description: '', completed: false });
                })
                .catch(error => {
                    console.error('There was an error updating the task!', error);
                });
        } else {
            axios.post('/api/tasks', task)
                .then(() => {
                    fetchTasks();
                    setTask({ id: 0, title: '', description: '', completed: false });
                })
                .catch(error => {
                    console.error('There was an error creating the task!', error);
                });
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label>Title</label>
                <input
                    type="text"
                    name="title"
                    value={task.title}
                    onChange={handleChange}
                    required
                />
            </div>
            <div>
                <label>Description</label>
                <input
                    type="text"
                    name="description"
                    value={task.description}
                    onChange={handleChange}
                    required
                />
            </div>
            <div>
                <label>Completed</label>
                <input
                    type="checkbox"
                    name="completed"
                    checked={task.completed}
                    onChange={(e) => setTask({ ...task, completed: e.target.checked })}
                />
            </div>
            <button type="submit">Save</button>
        </form>
    );
};

export default TaskForm;
