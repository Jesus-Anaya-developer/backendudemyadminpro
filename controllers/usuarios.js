// *Objetivo: Lógica de las rutas de usuarios
const { response } = require('express');

// *Importar el modelo de usuario
const Usuario = require('../models/usuario');

// *Importar bcrypt para encriptar la contraseña
const bcrypt = require('bcryptjs');

// *Importar el helper para generar el token
const { generateJWT } = require('../helpers/jwt');

// GET /usuarios
const getUsuarios = async (req, res) => {

       const usuarios = await Usuario.find({}, 'nombre correo role google');

       res.json({
              ok: true,
              msg: 'Get all users',
              usuarios,
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

              // *Generar el token
              const token = await generateJWT(usuario.id);

              // Logic to create a new user
              res.json({
                     ok: true,
                     msg: 'Create a new user',
                     // *El nombre de la propiedad es igual a la variable
                     usuario,
                     token,
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
const putUsuario = async (req, res = response) => {
       const uid = req.params.id;

       try {

              // *Verificar si el usuario existe
              const usuarioDB = await Usuario.findById(uid);

              // *Si el usuario no existe
              if (!usuarioDB) {
                     return res.status(404).json({
                            ok: false,
                            msg: 'No existe un usuario con ese id'
                     });
              }

              // *Actualizaciones del usuario
              const { password, google, email, ...campos } = req.body;

              // *Verificar si el correo existe
              if (usuarioDB.email !== email) {

                     // *Verificar si el correo existe
                     const existeEmail = await Usuario.findOne({ email });
                     // *Si el correo ya existe
                     if (existeEmail) {
                            return res.status(400).json({
                                   ok: false,
                                   msg: 'Ya existe un usuario con ese email'
                            });
                     }
              }


              // TODO: Validar token y comprobar si es el usuario correcto

              // *Actualizar el usuario
              campos.email = email;
              const usuarioActualizado = await Usuario.findByIdAndUpdate(uid, campos, { new: true });

              // Logic to update user by ID
              res.json({
                     ok: true,
                     msg: `Update user with ID ${userId}`,
                     usuario: usuarioActualizado
              });

       } catch (error) {
              console.log(error);
              res.status(500).json({
                     ok: false,
                     msg: 'Por favor hable con el administrador'
              });
       }


};

// DELETE /usuarios/:id
const deleteUsuario = async (req, res = response) => {
       const uid = req.params.id;
       // Logic to delete user by ID

       try {

              // *Verificar si el usuario existe
              const usuarioDB = await Usuario.findById(uid);

              // *Si el usuario no existe
              if (!usuarioDB) {
                     return res.status(404).json({
                            ok: false,
                            msg: 'No existe un usuario con ese id'
                     });
              }
              // *Eliminar el usuario
              await Usuario.findByIdAndDelete(uid);

              res.json({
                     msg: `Delete user with ID ${userId}`
              });

       } catch (error) {
              console.log(error);
              res.json({
                     ok: false,
                     msg: 'Hable con el administrador'
              });
       }

};

module.exports = {
       getUsuarios,
       getUsuarioId,
       postUsuario,
       putUsuario,
       deleteUsuario
}