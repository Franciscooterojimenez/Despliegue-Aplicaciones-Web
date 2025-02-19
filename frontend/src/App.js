import React, { useState } from 'react';
import axios from 'axios';

const App = () => {
  const [tareas, setTareas] = useState([]);
  const [titulo, setTitulo] = useState('');
  const [descripcion, setDescripcion] = useState('');

  // Obtener tareas
  const obtenerTareas = async () => {
    try {
      const response = await axios.get('https://despliegue-aplicaciones-web.onrender.com/tareas');
      setTareas(response.data);
    } catch (error) {
      console.error('Error al obtener tareas:', error);
    }
  };

  // Crear tarea
  const crearTarea = async () => {
    try {
      const response = await axios.post('https://despliegue-aplicaciones-web.onrender.com/tareas', {
        titulo,
        descripcion,
      });
      setTareas([...tareas, response.data]);
      setTitulo('');
      setDescripcion('');
    } catch (error) {
      console.error('Error al crear tarea:', error);
    }
  };

  // Eliminar tarea
  const eliminarTarea = async (id) => {
    try {
      await axios.delete(`https://despliegue-aplicaciones-web.onrender.com/tareas/${id}`);
      setTareas(tareas.filter((tarea) => tarea.id !== id));
    } catch (error) {
      console.error('Error al eliminar tarea:', error);
    }
  };

  return (
    <div className="App">
      <h1>Lista de Tareas</h1>
      <button onClick={obtenerTareas}>Obtener Tareas</button>

      <div>
        <h2>Crear Tarea</h2>
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
        <button onClick={crearTarea}>Crear</button>
      </div>

      <ul>
        {tareas.map((tarea) => (
          <li key={tarea.id}>
            <strong>{tarea.titulo}</strong>: {tarea.descripcion}
            <button onClick={() => eliminarTarea(tarea.id)}>Eliminar</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
