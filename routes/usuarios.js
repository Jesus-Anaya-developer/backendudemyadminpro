
// ! Ruta original: /api/usuarios

const express = require('express');
const router = express.Router();
// *Importar el validationResult
const { check } = require('express-validator');

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
], postUsuario);

// PUT /usuarios/:id
router.put('/:id', putUsuario);

// DELETE /usuarios/:id
router.delete('/:id', deleteUsuario)

module.exports = router;
