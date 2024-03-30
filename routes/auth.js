/*
 Path: '/api/login'
*/

const { Router } = require('express');
const { login, googleSignIn, renewToken } = require('../controllers/auth');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');

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

router.post('/google',
       [
              check('token', 'El token de google es obligatorio').not().isEmpty(),
              validarCampos
       ],
       googleSignIn
);

router.get('/renew',
       validarJWT,
       renewToken
);

module.exports = router;