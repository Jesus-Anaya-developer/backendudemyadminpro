// * Modelo de datos para la colección de usuarios
const { Schema, model } = require('mongoose');

// *Definir el esquema de la colección de usuarios
const MedicoSchema = Schema({
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
       },
       hospital: {
              required: true,
              type: Schema.Types.ObjectId,
              ref: 'Hospital'
       }
}, { collection: 'medicos' });

// *Método para ocultar __v y _id
MedicoSchema.method('toJSON', function () {
       // *Extraer __v, _id y el resto de los argumentos
       const { __v, _id, ...object } = this.toObject();
       // !Se puede oculatar tambien la contraseña
       // !const { __v, _id, contraseña ...object } = this.toObject();

       // *Modificar el valor de _id no afecta la base de datos
       object.uid = _id;
       console.log(object.uid);
       return object;
});


module.exports = model('Medico', MedicoSchema);
