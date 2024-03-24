const Usuario = require('../models/usuario');
const Medico = require('../models/medico');
const Hospital = require('../models/hospital');

const fs = require('fs');

const borrarImagen = (path) => {

       if (fs.existsSync(path)) {
              // * Borrar la imagen anterior
              fs.unlinkSync(path);
       }
}

const actualizarImagen = async (tipo, id, nombreArchivo) => {

       // * Actualizar base de datos
       let modelo;
       let pathViejo;

       switch (tipo) {
              case 'usuarios':
                     // * Verificar si el usuario existe
                     modelo = await Usuario.findById(id);
                     if (!modelo) {
                            console.log('No se encontró un usuario por id');
                            return false;
                     }
                     // * Verificar si el usuario tiene una imagen
                     path = `./uploads/${tipo}/${modelo.img}`;
                     borrarImagen(path);

                     // * Asignar la nueva imagen
                     modelo.img = nombreArchivo;
                     await modelo.save();

                     return true;
                     break;
              case 'medicos':
                     modelo = await Medico.findById(id);
                     if (!modelo) {
                            console.log('No se encontró un médico por id');
                            return false;
                     }

                     // * Verificar si el usuario tiene una imagen
                     path = `./uploads/${tipo}/${modelo.img}`;
                     borrarImagen(path);

                     modelo.img = nombreArchivo;
                     await modelo.save();

                     return true;
                     break;
              case 'hospitales':
                     modelo = await Hospital.findById(id);
                     if (!modelo) {
                            console.log('No se encontró un hospital por id');
                            return false;
                     }

                     // * Verificar si el usuario tiene una imagen
                     path = `./uploads/${tipo}/${modelo.img}`;
                     borrarImagen(path);

                     modelo.img = nombreArchivo;
                     await modelo.save();

                     return true;
                     break;
              default:
                     return false;
       }
}

module.exports = {
       actualizarImagen,
}