const { response } = require("express");

const getHospitales = async (req, res = response) => {

       res.json({
              ok: true,
              msg: 'getHospitales'
       });
};

const crearHospitales = async (req, res = response) => {

       res.json({
              ok: true,
              msg: 'crearHospitales'
       });
};

const actualizarHospitales = async (req, res = response) => {

       res.json({
              ok: true,
              msg: 'actualizarHospitales'
       });
};

const borrarHospitales = async (req, res = response) => {

       res.json({
              ok: true,
              msg: 'borrarHospitales'
       });
};

module.exports = {
       getHospitales,
       crearHospitales,
       actualizarHospitales,
       borrarHospitales,
};