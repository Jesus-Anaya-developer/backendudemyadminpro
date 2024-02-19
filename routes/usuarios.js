
// ! Ruta original: /api/usuarios

const express = require('express');
const router = express.Router();

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
router.post('/', postUsuario);

// PUT /usuarios/:id
router.put('/:id', putUsuario);

// DELETE /usuarios/:id
router.delete('/:id', deleteUsuario)

module.exports = router;
