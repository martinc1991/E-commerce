const server = require('express').Router(); //Import router from express module.
const { User, Order, Product } = require('../db.js'); // Import Categories model.
const { OK, CREATED, UPDATED, ERROR, NOT_FOUND, ERROR_SERVER } = require('../constants'); // Import Status constants.
const passport = require('passport');
const { isAuthenticated, isAdmin } = require('../passport/midellwares');
const crypto = require('crypto');

// Start Routes

//// 'Create User' route in '/'

server.post('/', function (req, res) {
	const { email, password, role, name } = req.body;
	console.log(req.body);
	let passEncrypt = User.encryptPassword(password);
	User.create({ name, email, password: passEncrypt, role })
		.then((user) => {
			console.log(user);
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

// GET USERS
server.get('/', (req, res) => {
	console.log('GET a users');
	User.findAll()
		.then((users) => {
			console.log('users: ', users);
			users.sort(function (a, b) {
				return a.id - b.id;
			});
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

// DELETE USER
server.delete('/', (req, res) => {
	console.log('**********');
	console.log(req.query);
	const { id } = req.query;
	User.findOne({ where: { id } })
		.then((deletedUser) => {
			console.log('voy a eliminar un usuario');
			deletedUser.destroy();
			return res.status(OK).json({
				message: 'Usuario eliminado',
				data: deletedUser,
			});
		})
		.catch((err) => {
			console.log('Se me complico la eliminada');
			console.log(err);
			return res.status(ERROR_SERVER).json({
				message: 'Error al eliminar usuario',
				data: err,
			});
		});
});

// MODIFICAR DATOS DEL USER
server.put('/', (req, res) => {
	console.log(req.body);
	const { email, id, role, resetPassword } = req.body;
	console.log(resetPassword);

	if (resetPassword) {
		var newRandomNumber = '';
		// Se genera un numero aleatorio con crypto.randomBytes
		newRandomNumber = crypto.randomBytes(10, (err, buf) => {
			if (err) throw err;
			console.log(`${buf.length} bytes of random data: ${buf.toString('hex')}`);
			// Se asigna el numero aleatorio a la variable newRandomNumber
			// Ademas se utiliza la funcion encryptPassword de bcrypt para la encriptacion
			newRandomNumber = User.encryptPassword(buf.toString('hex'));
		});
	}

	User.findOne({ where: { email } })
		.then((user) => {
			console.log('Dentro del .then');
			console.log(newRandomNumber);
			// Se actualizan los datos
			// resetPassword es 'true' solo cuando se aprieta el boton de resetear password, sino es 'false'
			if (resetPassword) {
				user.password = newRandomNumber;
			}
			user.role = role;
			// Se guardan los datos
			user.save();
			// IMPORTANTE: la contraseña aleatoria numerica que se pone mas arriba (newRandomNumber) luego se encripta y por el diseño del modelo no se muestra en queries. (en la base de datos solo se puede ver una encriptacion de la contraseña).
			console.log(user.dataValues);
			return res.status(OK).json({
				message: `El usuario se ha actualizado correctamente!`,
				data: user,
			});
		})
		.catch((err) => {
			return res.status(ERROR).json({
				message: 'Error al modificar en la ruta del usuario',
				data: err,
			});
		});
});

server.get('/:id', (req, res, next) => {
	const { id } = req.params;
	User.findAll({ where: { id }, include: { model: Order, include: Product } }).then((user) => {
		console.log(user);
		res
			.json({
				user: user,
			})
			.catch((err) => {
				return res.status(ERROR).json({
					message: 'Error al buscar User',
					data: err,
				});
			});
	});
});

/**************************************** Login **************************************** */

server.post('/singin', function (req, res, next) {
	passport.authenticate('local', function (err, user, info) {
		if (err) {
			return res.send({ message: 'User or Email incorrect' });
		}
		if (!user) {
			return res.send({ message: 'User or Email incorrect' });
		}
		req.logIn(user, function (err) {
			if (err) {
				return next(err);
			}
			return res.send({
				data: user,
			});
		});
	})(req, res, next);
});

server.get('/log/logout', (req, res) => {
	req.logOut();
	res.send({ message: 'logout' });
});

// <------------------------------------ Google ------------------------------------>
// GET /auth/google
// Use passport.authenticate() as route middleware to authenticate the request.
// The first step in Google authentication will involve redirecting the user to google.com. After authorization, Google will redirect the user back to this application at /auth/google/callback.
server.get('/auth/google', passport.authenticate('google', { scope: ['profile email https://www.googleapis.com/auth/userinfo.profile'] }));

// GET /auth/google/callback
// Use passport.authenticate() as route middleware to authenticate the request. If authentication fails, the user will be redirected back to the login page.  Otherwise, the primary route function function will be called, which, in this example, will redirect the user to the home page.
server.get('/auth/google/callback', passport.authenticate('google', { failureRedirect: 'http://localhost:3000/users' }), function (req, res) {
	console.log('a ver que hay en REQ');
	// console.log(req);
	// console.log('************');
	// console.log(req.login);
	// console.log('a ver que hay en REQ');
	console.log('Estos son los datos de la respuesta en RUTAS');
	console.log(res.req.user);
	console.log('antes de redireccionar');
	res.redirect('http://localhost:3000/login');
});

/**************************************** Login **************************************** */

// End Routes

module.exports = server;
