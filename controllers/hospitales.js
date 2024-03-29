const { response } = require("express");

const Hospital = require('../models/hospital');

const getHospitales = async (req, res = response) => {

       const hospitales = await Hospital.find().populate('usuario', 'nombre img');

       res.json({
              ok: true,
              hispitales: hospitales
       });
};

const crearHospitales = async (req, res = response) => {

       const uid = req.uid;
       // *Crear un nuevo hospital y filrar los campos que no se necesitan
       const hospital = new Hospital({
              usuario: uid, ...req.body
       });


       try {

              const hospitalDB = await hospital.save();

              res.json({
                     ok: true,
                     hospital: hospitalDB
              });

       } catch (error) {
              console.log(error);
              return res.status(500).json({
                     ok: false,
                     msg: 'Hable con el administrador'
              });
       }
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