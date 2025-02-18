import React, { useState } from 'react';

function App() {
  const [tareas, setTareas] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchTareas = async () => {
    setLoading(true);
    setError(null); // Limpiamos cualquier error previo
    try {
      const response = await fetch('https://despliegue-aplicaciones-web.onrender.com/tareas');
      
      if (!response.ok) {
        throw new Error('Error en la respuesta de la API');
      }
      
      const data = await response.json();
      
      // Verificamos que los datos sean los esperados
      console.log('Datos de la API:', data);

      // Asegurándonos de que estamos recibiendo los datos correctos
      if (Array.isArray(data)) {
        setTareas(data);  // Actualizamos el estado con las tareas obtenidas
      } else {
        throw new Error('Los datos no están en el formato esperado');
      }
    } catch (error) {
      console.error('Error al obtener tareas:', error);
      setError(error.message); // Guardamos el error en el estado
    } finally {
      setLoading(false);  // Terminamos el estado de carga
    }
  };

  return (
    <div>
      <button onClick={fetchTareas}>Cargar Tareas</button>

      {/* Mostrar mensaje de carga mientras se obtienen los datos */}
      {loading && <p>Cargando tareas...</p>}

      {/* Mostrar mensaje de error si ocurre algún problema */}
      {error && <p>Error: {error}</p>}

      {/* Mapeamos las tareas y les asignamos una "key" única */}
      <ul>
        {tareas.length > 0 ? (
          tareas.map((tarea) => (
            <li key={tarea.id}>
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
