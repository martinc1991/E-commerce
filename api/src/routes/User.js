const server = require('express').Router(); //Import router from express module.
const { User } = require('../db.js'); // Import Categories model.
const { OK, CREATED, ERROR, ERROR_SERVER } = require('../constants/index'); // Import Status constants.

// Start Routes

//// 'Create User' route in '/'

server.post('/', function (req, res) {
	const { email, password, role } = req.body;
	console.log(req.body);
	User.create({ email, password, role })
		.then((user) => {
			console.log(user.id);
			return res.status(CREATED).json({
				message: 'Usuario creado exitosamente!',
				data: user,
			});
		})
		.catch((err) => {
			console.log('catch');
			return res.status(ERROR).json({
				message: 'Error al crear usuario',
				data: err,
			});
		});
});

server.get('/', (req, res) => {
	//Product.findAll().then(products => res.status(STATUS.OK).json({message: 'Success',data: products})
	// res.send('andó');
	User.findAll()
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
