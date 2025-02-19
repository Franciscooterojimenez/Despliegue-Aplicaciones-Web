const express = require('express');
const mongoose = require('mongoose');
const Tarea = require('./models/Tarea');  // Importar el modelo de tarea
const app = express();

app.use(express.json());

// Conexión a MongoDB
const mongoURI = 'mongodb+srv://<Paco>:<e7rAWxyZpmdhvYbB>@cluster0.mongodb.net/tareasDB?retryWrites=true&w=majority';

mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Conectado a MongoDB'))
  .catch((error) => console.error('Error al conectar a MongoDB:', error));

// Rutas de la API

// Obtener todas las tareas
app.get('/tareas', async (req, res) => {
  try {
    const tareas = await Tarea.find();
    res.json(tareas);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener tareas' });
  }
});

// Crear nueva tarea
app.post('/tareas', async (req, res) => {
  const { titulo, descripcion } = req.body;
  const nuevaTarea = new Tarea({ titulo, descripcion });

  try {
    await nuevaTarea.save();
    res.status(201).json(nuevaTarea);
  } catch (error) {
    res.status(500).json({ message: 'Error al crear tarea' });
  }
});

// Eliminar tarea por ID
app.delete('/tareas/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const tarea = await Tarea.findByIdAndDelete(id);
    if (!tarea) {
      return res.status(404).json({ message: 'Tarea no encontrada' });
    }
    res.status(200).json({ message: 'Tarea eliminada' });
  } catch (error) {
    res.status(500).json({ message: 'Error al eliminar tarea' });
  }
});

// Configuración del puerto y servidor
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Servidor en puerto ${PORT}`);
});