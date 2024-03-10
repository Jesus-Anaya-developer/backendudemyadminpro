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
       password: {
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

// *Método para ocultar __v y _id
usuarioSchema.method('toJSON', function () {
       // *Extraer __v, _id y el resto de los argumentos
       const { __v, _id, password, ...object } = this.toObject();
       // !Se puede oculatar tambien la contraseña
       // !const { __v, _id, contraseña ...object } = this.toObject();

       // *Modificar el valor de _id no afecta la base de datos
       object.uid = _id;

       return object;
});

// *Exportar el modelo de usuario
const Usuario = mongoose.model('Usuario', usuarioSchema);

// *Exportar el modelo de usuario
module.exports = Usuario;
