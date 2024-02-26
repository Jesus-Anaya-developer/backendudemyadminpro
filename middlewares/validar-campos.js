
const { response } = require('express');
const { validationResult } = require('express-validator');

// *Middleware para validar los campos
const validarCampos = (req, res = response, next) => {

       const errors = validationResult(req);

       if (!errors.isEmpty()) {
              return res.status(400).json({
                     ok: false,
                     errors: errors.mapped()
              });
       }

       // If all fields are present, move to the next middleware or route handler
       next();

}

module.exports = { validarCampos, };
