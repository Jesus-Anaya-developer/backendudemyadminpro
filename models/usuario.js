// * Modelo de datos para la colección de usuarios
const { Schema, model } = require('mongoose');

// *Definir el esquema de la colección de usuarios
const UsuarioSchema = Schema({

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
              required: true,
       },
       img: {
              type: String,
       },
       role: {
              type: String,
              required: true,
              default: 'USER_ROLE'
       },
       google: {
              type: Boolean,
              default: false
       },
});

// *Método para ocultar __v y _id
UsuarioSchema.method('toJSON', function () {
       // *Extraer __v, _id y el resto de los argumentos
       const { __v, _id, password, ...object } = this.toObject();
       // !Se puede oculatar tambien la contraseña
       // !const { __v, _id, contraseña ...object } = this.toObject();

       // *Modificar el valor de _id no afecta la base de datos
       object.uid = _id;

       return object;
});


module.exports = model('Usuario', UsuarioSchema);
