const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
const { User } = require('../db.js');
const url = 'localhost:3001';
//${url}/users/singin`
const server = require('../routes/order.js');

/*************************** Serializarion de User ****************************** */
passport.serializeUser((user, done) => {
	console.log('serializacion');
	console.log(user);
	console.log('serializacion');

	done(null, user.id);
});

passport.deserializeUser((id, done) => {
	User.findOne({
		where: { id },
	})
		.then((user) => {
			console.log('todo bien con la serializacion');
			if (user) {
				return done(null, user);
			} else {
				return done(new Error('User no encontrado'));
			}
		})
		.catch((err) => {
			console.log('error de serializacion');
			console.log(err);
			return done(new Error('Internal Error'));
		});
});
/******************************************************************* */

/***************************  Configuracion de estrategia Local  ****************************** */
passport.use(
	new LocalStrategy(
		// Este objeto sirve para cambiar los nombres de las variables, nada mas
		{ usernameField: 'email', passwordField: 'password' },
		(email, password, done) => {
			console.log('Email: ' + email);
			console.log('Password: ' + password);
			User.findOne({ where: { email: email } })
				.then((user) => {
					console.log('Entre al THEN');
					// Si el usuario existe
					if (user) {
						// Si las contrasenias matchean (comparePassword esta en el modelo 'user', devuelve true o false)
						if (User.comparePassword(password, user.password)) {
							console.log(user.password + 'Entre al IF');
							// Se llama a la funcion done con 'user' (autenticacion exitosa)
							return done(null, {
								email: user.email,
								id: user.id,
								role: user.role,
								name: user.name,
							});
							// Si las contrasenias NO matchean
						} else {
							console.log('Password incorrect');
							// Se llama a la funcion done con 'null' (autenticacion fallida)
							return done(new Error('Password incorrect'));
						}
						// Si el usuario NO existe
					} else {
						console.log('User not Found');
						// Se llama a la funcion done con 'null' (autenticacion fallida)
						return done(new Error('User not found'), null);
					}
				})
				.catch((err) => {
					console.error(err);
					return done(new Error('Internal error'), null);
				});
		}
	)
);

/************************************************************************* */

/***************************  Configuracion de estrategia de Google  ****************************** */
// Use the GoogleStrategy within Passport.
//   Strategies in Passport require a `verify` function, which accept
//   credentials (in this case, an accessToken, refreshToken, and Google
//   profile), and invoke a callback with a user object.

const clientIdCode = '269758003483-2l6nugnundjtidqt2djkq7kt9jptsgh8.apps.googleusercontent.com';
const secretClient = 'LNKe2FhEPxksDu5focn6fwGL';
passport.use(
	new GoogleStrategy(
		{
			clientID: clientIdCode,
			clientSecret: secretClient,
			callbackURL: `http://${url}/users/auth/google/callback`,
		},
		function (accessToken, refreshToken, profile, done) {
			console.log('Datos desde Google');
			console.log('id: ' + profile.id);
			console.log('displayName: ' + profile.displayName);
			console.log('name: ' + profile.name);
			console.log('email: ' + profile.emails[0].value);
			// console.log('photo: ' + profile.photos[0].value);
			console.log('Datos desde Google');
			User.findOrCreate({
				where: { email: profile.emails[0].value },
				defaults: {
					name: profile.displayName,
					email: profile.emails[0].value,
					password: User.encryptPassword(profile.id),
					role: 'client',
				},
			})
				.then((res) => {
					console.log('acepte la promesa');
					console.log(res[0].email); // undefined
					console.log('lo que se ve arriba es el usuario creado en la base');

					return done(null, {
						email: res[0].email,
						id: res[0].id,
						role: res[0].role,
						name: res[0].name,
					});
				})
				.catch((err) => {
					console.log('entre al catch de la promesa');
					console.log(err);
					console.log('entre al catch de la promesa');
					return done(new Error('Internal error'), null);
				});
		}
	)
);
/************************************************************************* */
