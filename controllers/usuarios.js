// *Objetivo: Lógica de las rutas de usuarios
const { response } = require('express');

// *Importar el modelo de usuario
const Usuario = require('../models/usuario');

// *Importar bcrypt para encriptar la contraseña
const bcrypt = require('bcryptjs');

// GET /usuarios
const getUsuarios = async (req, res) => {

       const usuarios = await Usuario.find({}, 'nombre correo role google');

       res.json({
              ok: true,
              msg: 'Get all users',
              usuarios
       });
}

// GET /usuarios/:id
const getUsuarioId = (req, res) => {
       const userId = req.params.id;
       // Logic to fetch user by ID
       res.json({
              msg: `Get user with ID ${userId}`
       });
};

// POST /usuarios
const postUsuario = async (req, res = response) => {

       const { email, password } = req.body;

       // *Manejar los errores de la validación
       try {
              // *Verificar si el correo existe
              const existeEmail = await Usuario.findOne({ email });

              // *Si el correo o el usuario ya existen
              if (existeEmail) {
                     return res.status(400).json({
                            ok: false,
                            msg: 'El correo ya está registrado'
                     });
                     // *Si el usuario o el usuario ya existen
              }

              // *Crear una instancia de usuario
              const usuario = new Usuario(req.body);

              // *Encriptar la contraseña
              const salt = bcrypt.genSaltSync(5);
              // *Asignar la contraseña encriptada al usuario
              usuario.password = bcrypt.hashSync(password, salt);

              // *Guardar el usuario en la base de datos
              await usuario.save();
              console.log(req.body);
              // Logic to create a new user
              res.json({
                     ok: true,
                     msg: 'Create a new user',
                     // *El nombre de la propiedad es igual a la variable
                     usuario
              });

       } catch (error) {
              console.log(error);
              res.status(500).json({
                     ok: false,
                     msg: 'Por favor hable con el administrador'
              });
       }
};

// PUT /usuarios/:id
const putUsuario = (req, res) => {
       const userId = req.params.id;
       // Logic to update user by ID
       res.json({
              msg: `Update user with ID ${userId}`
       });
};

// DELETE /usuarios/:id
const deleteUsuario = (req, res) => {
       const userId = req.params.id;
       // Logic to delete user by ID
       res.json({
              msg: `Delete user with ID ${userId}`
       });
};

module.exports = {
       getUsuarios,
       getUsuarioId,
       postUsuario,
       putUsuario,
       deleteUsuario
}