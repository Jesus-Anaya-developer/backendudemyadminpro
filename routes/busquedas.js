/*
 ruta: /api/todo/:busqueda
*/
const { getTodo, getDocumentosColeccion } = require('../controllers/busquedas');

const express = require('express');

const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');

const router = express.Router();

// GET obtiene todos los datos
router.get('/:busqueda', validarJWT, getTodo);

router.get('/coleccion/:tabla/:busqueda', validarJWT, getDocumentosColeccion);

module.exports = router;