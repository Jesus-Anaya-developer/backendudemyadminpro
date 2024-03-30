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

       const id = req.params.id;
       const uid = req.uid;

       try {

              const hospital = await Hospital.findById(id);

              if (!hospital) {
                     return res.status(404).json({
                            ok: false,
                            msg: 'Hospital no encontrado por id',
                            id
                     });
              }

              const cambiosHospital = {
                     ...req.body,
                     usuario: req.uid
              };

              // *Actualizar el hospital
              const hospitalActualizado = await Hospital.findByIdAndUpdate(id, cambiosHospital, { new: true });

              res.json({
                     ok: true,
                     id,
                     uid,
                     hospital: hospitalActualizado
              });

       } catch (error) {

              res.status(500).json({
                     ok: false,
                     msg: 'Hospital no actualizado, hable con el administrador',
                     error
              });


       }

};

const borrarHospitales = async (req, res = response) => {

       const id = req.params.id;

       try {

              const hospital = await Hospital.findById(id);

              if (!hospital) {
                     return res.status(404).json({
                            ok: false,
                            msg: 'Hospital no encontrado por id',
                            id
                     });
              }

              // *Eliminar hospital
              await Hospital.findByIdAndDelete(id);

              res.json({
                     ok: true,
                     msg: 'Hospital eliminado',
                     id
              });

       } catch (error) {

              res.status(500).json({
                     ok: false,
                     msg: 'Hospital no eliminado, hable con el administrador',
                     error
              });


       }
};

module.exports = {
       getHospitales,
       crearHospitales,
       actualizarHospitales,
       borrarHospitales,
};