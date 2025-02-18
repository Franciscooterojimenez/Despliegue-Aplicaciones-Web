require("dotenv").config();
const express = require("express");
const cors = require("cors");

const mongoose = require('mongoose');

// Conectar a MongoDB Atlas
mongoose.connect('mongodb+srv://<foterojimenez>:<foterojimenez>@cluster0.mongodb.net/tareasDB?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Conectado a MongoDB Atlas'))
  .catch(err => console.log('Error al conectar con MongoDB Atlas:', err));

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 3000;

// Rutas
app.use("/tareas", require("./routes/tasks"));

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
