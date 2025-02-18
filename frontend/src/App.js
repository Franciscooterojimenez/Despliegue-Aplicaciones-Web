import React, { useState } from "react";

function App() {
    const [tasks, setTasks] = useState([]);

    const fetchTasks = async () => {
        const response = await fetch("https://tu-api-en-render.com/tareas");
        const data = await response.json();
        setTasks(data);
    };

    return (
        <div>
            <h1>Lista de Tareas</h1>
            <button onClick={fetchTasks}>Cargar Tareas</button>
            <ul>
                {tasks.map((task) => (
                    <li key={task._id}>{task.title}: {task.description}</li>
                ))}
            </ul>
        </div>
    );
}

export default App;
