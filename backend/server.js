const express = require('express');
const bodyParser = require('body-parser');
const tareasRoutes = require('./routes/tareas');

const app = express();
app.use(bodyParser.json());

app.use('/tareas', tareasRoutes);

app.listen(3000, () => {
    console.log('Servidor corriendo en http://localhost:3000');
});
