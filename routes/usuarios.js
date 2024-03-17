
// ! Ruta original: /api/usuarios
// *Importar el modulo de express
const { Router } = require('express');
const router = Router();
// *Importar el validationResult
const { check } = require('express-validator');
// *Importar el middleware de validación
const { validarCampos } = require('../middlewares/validar-campos');

const { getUsuarios,
       getUsuarioId,
       postUsuario,
       putUsuario,
       deleteUsuario } = require('../controllers/usuarios');
const { validarJWT } = require('../middlewares/validar-jwt');

// GET /usuarios
router.get('/', validarJWT, getUsuarios);

// GET /usuarios/:id
router.get('/:id', getUsuarioId);

// POST /usuarios
// *Validar los campos del usuario
router.post('/', [
       check('nombre', 'El nombre es obligatorio').not().isEmpty(),
       check('password', 'La contraseña es obligatoria').not().isEmpty(),
       check('email', 'El correo es obligatorio').isEmail(),
       validarCampos,
], postUsuario);

// PUT /usuarios/:id

// *Validar los campos del usuario
router.put('/:id', [
       validarJWT,
       check('nombre', 'El nombre es obligatorio').not().isEmpty(),
       check('email', 'El correo es obligatorio').isEmail(),
       check('role', 'El role es obligatorio').not().isEmpty(),
       validarCampos,
], putUsuario);

// DELETE /usuarios/:id
router.delete('/:id',
       validarJWT,
       deleteUsuario)

module.exports = router;
