const mongoose = require('mongoose');

// Definir el esquema para la tarea
const tareaSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true }
});

// Crear el modelo para las tareas
const Tarea = mongoose.model('Tarea', tareaSchema);

module.exports = Tarea;
