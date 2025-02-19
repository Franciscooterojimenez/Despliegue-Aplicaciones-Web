require('dotenv').config();
const express = require('express');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

let tareas = [];

app.get('/tareas', (req, res) => res.json(tareas));

app.post('/tareas', (req, res) => {
    const tarea = { id: tareas.length + 1, ...req.body };
    tareas.push(tarea);
    res.status(201).json(tarea);
});

app.delete('/tareas/:id', (req, res) => {
    tareas = tareas.filter(t => t.id !== parseInt(req.params.id));
    res.status(204).send();
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Servidor corriendo en puerto ${PORT}`));
