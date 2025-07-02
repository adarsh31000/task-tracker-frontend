import React, { useEffect, useState } from 'react';
import axios from 'axios';

const API_URL = 'https://task-tracker-api-e4hnc5cngshaddg6.eastus-01.azurewebsites.net/tasks';

function App() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState('');

  // Fetch tasks on load
  useEffect(() => {
    axios.get(API_URL)
      .then(res => setTasks(res.data))
      .catch(err => console.error('Error fetching tasks:', err));
  }, []);

  // Add new task
  const addTask = () => {
    if (!title.trim()) return;
    axios.post(API_URL, { title, status: 'pending' })
      .then(() => {
        setTitle('');
        return axios.get(API_URL); // Refresh list
      })
      .then(res => setTasks(res.data))
      .catch(err => console.error('Error adding task:', err));
  };

  return (
    <div style={{ padding: '2rem', fontFamily: 'Arial' }}>
      <h1>📋 Task Tracker</h1>
      <input
        value={title}
        onChange={e => setTitle(e.target.value)}
        placeholder="Enter new task"
        style={{ padding: '0.5rem', width: '300px' }}
      />
      <button onClick={addTask} style={{ marginLeft: '1rem', padding: '0.5rem' }}>
        Add Task
      </button>
      <ul style={{ marginTop: '2rem' }}>
        {tasks.map(task => (
          <li key={task.id}>
            {task.title} — <strong>{task.status}</strong>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;

