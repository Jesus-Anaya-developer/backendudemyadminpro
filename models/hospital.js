// * Modelo de datos para la colección de usuarios
const { Schema, model } = require('mongoose');

// *Definir el esquema de la colección de usuarios
const HospitalSchema = Schema({
       nombre: {
              type: String,
              required: true
       },
       img: {
              type: String,
       },
       usuario: {
              required: true,
              type: Schema.Types.ObjectId,
              ref: 'Usuario'
       }
}, { collection: 'hospitales' });

// *Método para ocultar __v y _id
HospitalSchema.method('toJSON', function () {
       // *Extraer __v, _id y el resto de los argumentos
       const { __v, _id, ...object } = this.toObject();
       // !Se puede oculatar tambien la contraseña
       // !const { __v, _id, contraseña ...object } = this.toObject();

       // *Modificar el valor de _id no afecta la base de datos
       object.uid = _id;

       return object;
});


module.exports = model('Usuario', HospitalSchema);
