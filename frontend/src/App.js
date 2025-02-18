import React, { useState, useEffect } from 'react';

function App() {
  const [tareas, setTareas] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  // Función para cargar tareas desde la API
  const fetchTareas = async () => {
    setLoading(true);
    setError(null); // Limpiamos cualquier error previo
    try {
      const response = await fetch('http://localhost:3000/tareas');
      if (!response.ok) {
        throw new Error('Error al obtener tareas');
      }
      const data = await response.json();
      setTareas(data); // Actualizamos el estado con las tareas obtenidas
    } catch (error) {
      setError(error.message); // Guardamos el error en el estado
    } finally {
      setLoading(false); // Terminamos el estado de carga
    }
  };

  useEffect(() => {
    fetchTareas(); // Cargar las tareas al inicio
  }, []);

  return (
    <div>
      <h1>Tareas</h1>
      {loading && <p>Cargando tareas...</p>}
      {error && <p>Error: {error}</p>}
      <ul>
        {tareas.length > 0 ? (
          tareas.map((tarea) => (
            <li key={tarea._id}>
              <strong>{tarea.titulo}</strong>: {tarea.descripcion}
            </li>
          ))
        ) : (
          <p>No hay tareas disponibles</p>
        )}
      </ul>
    </div>
  );
}

export default App;
