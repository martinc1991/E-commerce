const server = require('express').Router(); //Import router from express module.
const { Users } = require('../db.js'); // Import Categories model.
const { OK, CREATED, UPDATED, ERROR, NOT_FOUND, ERROR_SERVER } = require('../constants'); // Import Status constants.

// Start Routes

//// 'Create User' route in '/'

server.post('/', function (req, res) {
	const { email, password } = req.body;

	return Users.create({ email, password })
		.then((user) => {
			return res.status(CREATED).json({
				message: 'Usuario creado exitosamente!',
				data: user,
			});
		})
		.catch((err) => {
			return res.status(ERROR).json({
				message: 'Error al crear usuario',
				data: err,
			});
		});
});

server.get('/', (req, res) => {
	//Product.findAll().then(products => res.status(STATUS.OK).json({message: 'Success',data: products})
	// res.send('andó');
	Users.findAll()
		.then((users) => {
			return res.status(OK).json({
				message: 'Success',
				data: users,
			});
		})
		.catch((err) => {
			return res.status(ERROR_SERVER).json({
				message: 'Hubo un error en el servidor',
				data: err,
			});
		});
});

// End Routes

module.exports = server;
