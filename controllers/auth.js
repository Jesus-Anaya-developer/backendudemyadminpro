const { response } = require('express');
const bcrypt = require('bcryptjs');

const Usuario = require('../models/usuario');
const { generateJWT } = require('../helpers/jwt');
const { googleVerify } = require('../helpers/google-verify');

const login = async (req, res = response) => {

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

const googleSignIn = async (req, res = response) => {

       try {

              const { email, name, picture } = await googleVerify(req.body.token);

              const usuarioDB = await Usuario.findOne({ email });
              let usuario;

              if (!usuarioDB) {
                     usuario = new Usuario({
                            nombre: name,
                            email,
                            password: '@@@',
                            img: picture,
                            google: true
                     });

              } else {
                     usuario = usuarioDB;
                     usuario.google = true;
              }
              // *Guardar en BD
              await usuario.save();

              // *Generar el token - JWT
              const token = await generateJWT(usuario.id);

              res.json({
                     ok: true,
                     msg: 'Google SignIn',
                     email,
                     name,
                     picture,
                     token
              });

       } catch (error) {
              console.log(error);
              res.status(400).json({
                     ok: false,
                     msg: 'El token no es correcto'
              });
       }
}

// *Renovar token
/*
       Si el usuario tiene un token en la computadora
       a la hora de hacer una petición, se le puede
       asignar otro token.
*/
const renewToken = async (req, res = response) => {

       const uid = req.uid;

       // *Generar un nuevo JWT
       const token = await generateJWT(uid);

       res.json({
              ok: true,
              uid,
              token
       });
}

module.exports = {
       login,
       googleSignIn,
       renewToken
};