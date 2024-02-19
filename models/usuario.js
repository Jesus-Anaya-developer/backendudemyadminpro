// * Modelo de datos para la colección de usuarios
const mongoose = require('mongoose');

// *Definir el esquema de la colección de usuarios
const usuarioSchema = new mongoose.Schema({
       nombre: {
              type: String,
              required: true
       },
       email: {
              type: String,
              required: true,
              unique: true
       },
       contraseña: {
              type: String,
              required: true
       },
       img: {
              type: String,
              default: 'https://res.cloudinary.com/dzr6lsw7w/image/upload/v1617204437/usuarios/default-user-image.png'
       },
       role: {
              type: String,
              required: true,
              default: 'USER_ROLE'
       },
       google: {
              type: Boolean,
              default: false
       }
});

// *Exportar el modelo de usuario
const Usuario = mongoose.model('Usuario', usuarioSchema);

// *Exportar el modelo de usuario
module.exports = Usuario;
