const jwt = require('jsonwebtoken');

const validarJWT = (req, res, next) => {

       // Leer el token
       const token = req.header('x-token');

       if (!token) {
              return res.status(401).json({
                     ok: false,
                     msg: 'No hay token en la petición'
              });
       }

       try {
              // *Extraer el uid del usuario que viene en el token y lo verifica
              const { uid } = jwt.verify(token, process.env.JWT_SECRET_KEY);

              req.uid = uid;

              next();

       } catch (error) {
              return res.status(401).json({
                     ok: false,
                     msg: 'Token no válido'
              });
       }
};

module.exports = {
       validarJWT
};