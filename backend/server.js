const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');  // Importa cors
const Tarea = require('./models/Tarea');
const app = express();

// Habilitar CORS
app.use(cors());  // Esto permitirá peticiones de cualquier origen

// O si quieres restringirlo a tu frontend en localhost (por seguridad):
// app.use(cors({
//   origin: 'http://localhost:3000'
// }));

app.use(express.json());

// Rutas de la API
app.get('/tareas', async (req, res) => {
  try {
    const tareas = await Tarea.find();
    res.json(tareas);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener tareas' });
  }
});

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

// Conectar a MongoDB y arrancar el servidor
const mongoURI = 'mongodb+srv://Paco:Tgi188WaHf24vsv8@clustertareas.4bx6c.mongodb.net/';

mongoose.connect(mongoURI)
  .then(() => console.log('Conectado a MongoDB'))
  .catch(err => {
    console.error('Error al conectar a MongoDB:', err);
});
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Servidor en puerto ${PORT}`);
});