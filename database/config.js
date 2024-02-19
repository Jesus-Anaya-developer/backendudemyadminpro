// *Importar las variables de entorno
require('dotenv').config();

// *Archivo de configuracion de la base de datos
const mongoose = require('mongoose');

// *Funcion para conectar a la base de datos de manera asincrona
/**
 * Connects to the MongoDB database.
 * @async
 * @function dbConnect
 * @returns {Promise<void>} A promise that resolves when the connection is successful or rejects with an error.
 */
const dbConnect = async () => {

       try {
              // *Conexion a la base de datos
              await mongoose.connect(process.env.DB_CNN)
                     // *Mensaje de conexion exitosa
                     .then(() => {
                            console.log('Connected to MongoDB');
                     })

       } catch (error) {
              // *Mensaje de error en la conexion
              console.error('Error connecting to MongoDB:', error);
       }
};

// *Exportar la funcion de conexion
module.exports = {
       dbConnect
};