const Usuario = require('../models/usuario');

// GET /usuarios
const getUsuarios = (req, res) => {
       res.json({
              msg: 'Get all users'
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
const postUsuario = async (req, res) => {

       console.log(req.body);

       // *Extraer el body
       const { nombre, correo, password } = req.body;

       // *Crear una instancia de usuario
       const usuario = new Usuario(req.body);

       // *Guardar el usuario en la base de datos
       await usuario.save();

       // Logic to create a new user
       res.json({
              ok: true,
              msg: 'Create a new user',
              // *El nombre de la propiedad es igual a la variable
              usuario
       });
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