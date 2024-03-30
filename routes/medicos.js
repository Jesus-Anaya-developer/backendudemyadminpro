/*
       Ruta Medicos
       /api/medicos
*/

const {
       getMedicos,
       crearMedico,
       actualizarMedico,
       borrarMedico,
} = require('../controllers/medicos');

const express = require('express');

const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');

const router = express.Router();

// GET obtiene todos los medicos
router.get('/', getMedicos);

// POST crear Medico
// *Validar los campos del usuario
router.post('/', [
       validarJWT,
       check('nombre', 'El nombre del medico es necesario').not().isEmpty(),
       check('hospital', 'El hospital id debe de ser valido').isMongoId(),
       validarCampos,
], crearMedico);

// PUT actualizar medico
// *Validar los campos del usuario
router.put('/:id', [
       validarJWT,
       check('nombre', 'El nombre del medico es necesario').not().isEmpty(),
       check('hospital', 'El hospital id debe de ser valido').isMongoId(),
], actualizarMedico);

// DELETE Eliminal medico
router.delete('/:id',
       validarJWT,
       borrarMedico);

module.exports = router;