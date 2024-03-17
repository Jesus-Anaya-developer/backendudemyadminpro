// Objetivo: Generar un token JWT con el uid del usuario
const jwt = require('jsonwebtoken');

// * Generar un token JWT con el uid del usuario
const generateJWT = (uid) => {
       // * Retornar una promesa para manejar el token
       return new Promise((resolve, reject) => {
              // * Crear el payload con el uid del usuario
              const payload = { uid };
              // * Generar el token con el payload y la clave secreta
              jwt.sign({ payload }, process.env.JWT_SECRET_KEY, {
                     // * Expira en 10 horas
                     expiresIn: '10h'
              }, (err, token) => {
                     if (err) {
                            console.log(err);
                            reject('No se pudo generar el token');
                     } else {
                            resolve(token);
                     }
              });
       });
}

module.exports = {
       generateJWT,
}