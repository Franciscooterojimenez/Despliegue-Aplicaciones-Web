// src/Tareas.js
import React, { useState } from 'react';
import axios from 'axios';

const Tareas = () => {
    const [tareas, setTareas] = useState([]);
    const [titulo, setTitulo] = useState('');
    const [descripcion, setDescripcion] = useState('');

    // Función para obtener las tareas
    const obtenerTareas = async () => {
        try {
            const response = await axios.get('http://localhost:3000/tareas');
            setTareas(response.data);
        } catch (error) {
            console.error('Error al obtener las tareas', error);
        }
    };

    // Función para crear una tarea
    const crearTarea = async () => {
        try {
            const nuevaTarea = { titulo, descripcion };
            await axios.post('http://localhost:3000/tareas', nuevaTarea);
            obtenerTareas();  // Recargar las tareas después de crear una nueva
            setTitulo('');
            setDescripcion('');
        } catch (error) {
            console.error('Error al crear la tarea', error);
        }
    };

    // Función para eliminar una tarea
    const eliminarTarea = async (id) => {
        try {
            await axios.delete(`http://localhost:3000/tareas/${id}`);
            obtenerTareas();  // Recargar las tareas después de eliminar una
        } catch (error) {
            console.error('Error al eliminar la tarea', error);
        }
    };

    return (
        <div>
            <h1>Gestión de Tareas</h1>
            <div>
                <input
                    type="text"
                    placeholder="Título"
                    value={titulo}
                    onChange={(e) => setTitulo(e.target.value)}
                />
                <input
                    type="text"
                    placeholder="Descripción"
                    value={descripcion}
                    onChange={(e) => setDescripcion(e.target.value)}
                />
                <button onClick={crearTarea}>Crear Tarea</button>
            </div>
            <button onClick={obtenerTareas}>Obtener Tareas</button>
            <ul>
                {tareas.map((tarea) => (
                    <li key={tarea.id}>
                        {tarea.titulo} - {tarea.descripcion}
                        <button onClick={() => eliminarTarea(tarea.id)}>Eliminar</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Tareas;
