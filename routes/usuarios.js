
// ! Ruta original: /api/usuarios

const express = require('express');
const router = express.Router();
// *Importar el validationResult
const { check } = require('express-validator');
// *Importar el middleware de validación
const { validarCampos } = require('../middlewares/validar-campos');

const { getUsuarios,
       getUsuarioId,
       postUsuario,
       putUsuario,
       deleteUsuario } = require('../controllers/usuarios');

// GET /usuarios
router.get('/', getUsuarios);

// GET /usuarios/:id
router.get('/:id', getUsuarioId);

// POST /usuarios
router.post('/', [
       check('nombre', 'El nombre es obligatorio').not().isEmpty(),
       check('password', 'La contraseña es obligatoria').not().isEmpty(),
       check('email', 'El correo es obligatorio').isEmail(),
       validarCampos,
], postUsuario);

// PUT /usuarios/:id
router.put('/:id', [
       check('nombre', 'El nombre es obligatorio').not().isEmpty(),
       check('email', 'El correo es obligatorio').isEmail(),
       check('role', 'El role es obligatorio').not().isEmpty(),
], putUsuario);

// DELETE /usuarios/:id
router.delete('/:id', deleteUsuario)

module.exports = router;
