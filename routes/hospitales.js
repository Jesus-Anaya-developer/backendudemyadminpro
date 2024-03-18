/*
       '/api/hospitales'
*/

const {
       getHospitales,
       crearHospitales,
       actualizarHospitales,
       borrarHospitales,
} = require('../controllers/hospitales');

const express = require('express');

const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');

const router = express.Router();

// GET obtiene todos los hospitales
router.get('/', getHospitales);

// POST crear Hospital
// *Validar los campos del usuario
router.post('/', [

], crearHospitales);

// PUT actualizar Hospital
// *Validar los campos del usuario
router.put('/:id', [
], actualizarHospitales);

// DELETE Eliminal Hospital
router.delete('/:id',
       borrarHospitales);

module.exports = router;