const express = require("express");
const router = express.Router();

let tareas = []; // Arreglo temporal para almacenar tareas en memoria

// Obtener todas las tareas
router.get("/", (req, res) => {
  res.json(tareas);
});

// Crear una nueva tarea
router.post("/", (req, res) => {
  const { titulo, descripcion } = req.body;
  if (!titulo || !descripcion) {
    return res.status(400).json({ error: "Título y descripción requeridos" });
  }
  const nuevaTarea = { id: Date.now(), titulo, descripcion };
  tareas.push(nuevaTarea);
  res.status(201).json(nuevaTarea);
});

// Eliminar una tarea por ID
router.delete("/:id", (req, res) => {
  const { id } = req.params;
  tareas = tareas.filter((tarea) => tarea.id !== parseInt(id));
  res.json({ mensaje: "Tarea eliminada" });
});

module.exports = router;
