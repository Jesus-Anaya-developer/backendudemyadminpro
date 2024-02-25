// *Importar el modulo de express
const express = require('express');

// *Importar el modulo de dotenv
require('dotenv').config();

// *Importar la funcion de conexion
const { dbConnect } = require('./database/config');

const app = express();
const port = process.env.PORT;

// *Importar el modulo de cors
const cors = require('cors');

// *Lectura y parseo del body
app.use(express.json());

// *Configurar el cors
app.use(cors());

// *Llamar a la funcion de conexion
dbConnect();

// Define your routes here
app.use('/api/usuarios', require('./routes/usuarios'));

app.listen(port, () => {
       console.log(`Server is running on port ${port}`);
});
