const { response } = require("express");

const Medico = require('../models/medico');

const getMedicos = async (req, res = response) => {

       const medicos = await Medico.find().populate('usuario', 'nombre img').populate('hospital', 'nombre img');

       res.json({
              ok: true,
              medicos: medicos
       });
};

const crearMedico = async (req, res = response) => {

       const uid = req.uid;
       // *Crear un nuevo medico y filrar los campos que no se necesitan
       const medico = new Medico({
              usuario: uid, ...req.body
       });
       console.log(medico);

       try {

              const medicoDB = await medico.save();

              res.json({
                     ok: true,
                     medico: medicoDB
              });

       } catch (error) {
              console.log(error);
              res.status(500).json({
                     ok: false,
                     msg: 'Hable con el administrador'
              });
       }
};

const actualizarMedico = async (req, res = response) => {

       res.json({
              ok: true,
              msg: 'actualizarMedico'
       });
};

const borrarMedico = async (req, res = response) => {

       res.json({
              ok: true,
              msg: 'borrarMedico'
       });
};

module.exports = {
       getMedicos,
       crearMedico,
       actualizarMedico,
       borrarMedico,
};