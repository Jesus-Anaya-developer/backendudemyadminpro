// getTodo
const { response } = require("express");

const Usuario = require('../models/usuario');
const Medico = require('../models/medico');
const Hospital = require('../models/hospital');

const getTodo = async (req, res = response) => {

       const busqueda = req.params.busqueda;
       const regex = new RegExp(busqueda, 'i');

       const [usuario, medico, hospital] = await Promise.all([
              Usuario.find({ nombre: regex }),
              Medico.find({ nombre: regex }),
              Hospital.find({ nombre: regex }),
       ]);

       try {

              res.json({
                     ok: true,
                     usuario,
                     medico,
                     hospital,
              });

       } catch (error) {
              console.log(error);
              res.status(500).json({
                     ok: false,
                     msg: 'Hable con el administrador'
              });
       }
};

const getDocumentosColeccion = async (req, res = response) => {

       const tabla = req.params.tabla;
       const busqueda = req.params.busqueda;
       const regex = new RegExp(busqueda, 'i');

       try {
              switch (tabla) {
                     case 'medicos':
                            const medicos = await Medico.find({ nombre: regex })
                                   .populate('usuario', 'nombre img')
                                   .populate('hospital', 'nombre img');
                            res.json({
                                   ok: true,
                                   medicos
                            });
                            break;
                     case 'hospitales':
                            const hospitales = await Hospital.find({ nombre: regex })
                                   .populate('usuario', 'nombre img');
                            res.json({
                                   ok: true,
                                   hospitales
                            });
                            break;
                     case 'usuarios':
                            const usuarios = await Usuario.find({ nombre: regex });
                            res.json({
                                   ok: true,
                                   usuarios
                            });
                            break;
                     default:
                            res.status(400).json({
                                   ok: false,
                                   msg: 'La tabla tiene que ser usuarios/medicos/hospitales'
                            });
              }

       } catch (error) {
              console.log(error);
              res.status(500).json({
                     ok: false,
                     msg: 'Hable con el administrador'
              });
       }
};

module.exports = {
       getTodo,
       getDocumentosColeccion
};