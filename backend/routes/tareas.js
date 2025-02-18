const express = require('express');
const router = express.Router();

// Lista de tareas simulada
let tareas = [
    { id: 1, titulo: "Estudiar JavaScript", descripcion: "Repasar conceptos de JS" },
    { id: 2, titulo: "Hacer ejercicio", descripcion: "Correr 30 minutos" }
];

// GET /tareas
router.get('/', (req, res) => {
    res.json(tareas);
});

// POST /tareas
router.post('/', (req, res) => {
    const { titulo, descripcion } = req.body;
    const nuevaTarea = { id: tareas.length + 1, titulo, descripcion };
    tareas.push(nuevaTarea);
    res.status(201).json(nuevaTarea);
});

// DELETE /tareas/:id
router.delete('/:id', (req, res) => {
    const { id } = req.params;
    tareas = tareas.filter(tarea => tarea.id !== parseInt(id));
    res.status(200).send(`Tarea con ID ${id} eliminada`);
});

module.exports = router;
