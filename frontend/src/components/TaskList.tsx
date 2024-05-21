import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Task } from '../types/Task';

const TaskList: React.FC = (all_tasks) => {
    const [tasks, setTasks] = useState<Task[]>([]);

    useEffect(() => {
        axios.get<Task[]>('/api/tasks')
            .then(response => {
                setTasks(response.data);
            })
            .catch(error => {
                console.error('There was an error fetching the tasks!', error);
            });
    }, []);

    return (
        <div>
            <h1>Task List</h1>
            <ul>
                {tasks.map(task => (
                    <li key={task.id}>
                        <h2>{task.title}</h2>
                        <p>{task.description}</p>
                        <p>{task.completed ? 'Completed' : 'Not Completed'}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default TaskList;