const { response } = require('express');
const bcrypt = require('bcryptjs');

const Usuario = require('../models/usuario');
const { generateJWT } = require('../helpers/jwt');

const login = async (req, res) => {

       const { email, password } = req.body;

       try {

              // *Verificar si el email existe
              const usuarioDB = await Usuario.findOne({ email });
              if (!usuarioDB) {
                     return res.status(404).json({
                            ok: false,
                            msg: 'Email no encontrado'
                     });
              }

              // *Verificar la contraseña
              const validPassword = bcrypt.compareSync(password, usuarioDB.password);
              if (!validPassword) {
                     return res.status(400).json({
                            ok: false,
                            msg: 'La contraseña no es válida'
                     });
              }

              // *Generar el token
              const token = await generateJWT(usuarioDB.id);

              res.json({
                     ok: true,
                     token
              });

       } catch (error) {
              console.log(error);
              res.status(500).json({
                     ok: false,
                     msg: 'Hable con el administrador'
              });
       }
};

module.exports = {
       login,
};