/*
 ruta: /api/uploads
*/
const { cargarArchivo, retornaImagen } = require('../controllers/uploads');
const fileUpload = require('express-fileupload');

const express = require('express');

const { validarJWT } = require('../middlewares/validar-jwt');

const router = express.Router();

// default options
router.use(fileUpload());

router.put('/:tipo/:id', validarJWT, cargarArchivo);

router.get('/:tipo/:foto', validarJWT, retornaImagen);

module.exports = router;