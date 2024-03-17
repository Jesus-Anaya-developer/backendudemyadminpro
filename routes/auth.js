/*
 Path: '/api/login'
*/

const { Router } = require('express');
const { login } = require('../controllers/auth');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');

// Aquí puedes escribir tu código para la autenticación
const router = Router();

router.post('/',
       [
              check('email', 'El correo es obligatorio').isEmail(),
              check('password', 'La contraseña es obligatoria').not().isEmpty(),
              validarCampos
       ],
       login
);

module.exports = router;