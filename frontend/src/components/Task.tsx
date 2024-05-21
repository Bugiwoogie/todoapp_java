import React, { useState, useEffect } from 'react';
import TaskList from './TaskList';
import TaskForm from './TaskForm';
import axios from 'axios';
import { Task as TaskType } from '../types/Task';

const Task: React.FC = () => {
    const [tasks, setTasks] = useState<TaskType[]>([]);
    const [task, setTask] = useState<TaskType>({ id: 0, title: '', description: '', completed: false });

    const fetchTasks = () => {
        axios.get<TaskType[]>('/api/tasks')
            .then(response => {
                setTasks(response.data);
            })
            .catch(error => {
                console.error('There was an error fetching the tasks!', error);
            });
    };

    useEffect(() => {
        fetchTasks();
    }, []);

    return (
        <div>
            <TaskForm task={task} setTask={setTask} fetchTasks={fetchTasks} />
            {/* <TaskList tasks={tasks} /> */}
        </div>
    );
};

export default Task;
