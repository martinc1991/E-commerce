require('dotenv').config();
const { Sequelize } = require('sequelize');
const fs = require('fs');
const path = require('path');
const bcrypt = require('bcrypt');
const { DB_USER, DB_PASSWORD, DB_HOST } = process.env;
console.log(DB_USER, DB_PASSWORD, DB_HOST);
// Password Encrypting
const crypto = require('crypto');

const sequelize = new Sequelize(`postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/development`, {
	logging: false, // set to console.log to see the raw SQL queries
	native: false, // lets Sequelize know we can use pg-native for ~30% more speed
});
const basename = path.basename(__filename);

const modelDefiners = [];

// Leemos todos los archivos de la carpeta Models, los requerimos y agregamos al arreglo modelDefiners
fs.readdirSync(path.join(__dirname, '/models'))
	.filter((file) => file.indexOf('.') !== 0 && file !== basename && file.slice(-3) === '.js')
	.forEach((file) => {
		modelDefiners.push(require(path.join(__dirname, '/models', file)));
	});

// Injectamos la conexion (sequelize) a todos los modelos
modelDefiners.forEach((model) => model(sequelize));
// Capitalizamos los nombres de los modelos ie: product => Product
let entries = Object.entries(sequelize.models);
let capsEntries = entries.map((entry) => [entry[0][0].toUpperCase() + entry[0].slice(1), entry[1]]);
sequelize.models = Object.fromEntries(capsEntries);

// En sequelize.models están todos los modelos importados como propiedades
// Para relacionarlos hacemos un destructuring
const { Product, Categories, Order, User, Order_line, Review } = sequelize.models;
console.log(sequelize.models);

// Aca vendrian las relaciones
// Product.hasMany(Reviews);

Product.belongsToMany(Order, { through: Order_line });
Order.belongsToMany(Product, { through: Order_line });

//Review to product
Product.hasMany(Review);
Review.belongsTo(Product);

//Review user

User.hasMany(Review);
Review.belongsTo(User);

//productos y categorias

Product.belongsToMany(Categories, { through: 'Product_Category' });
Categories.belongsToMany(Product, { through: 'Product_Category' });
User.hasMany(Order);
Order.belongsTo(User);

/***************************** Function of Model *****************/
// User.generateSalt = function() {
//     return crypto.randomBytes(16).toString('base64')
// }
// User.methods.encryptPassword = function(password) {
// 	return bcrypt.hashSync(password, bcrypt.genSaltSync(10))
// }
// User.methods.comparePassword = function(password){
// 	return bcrypt.compareSync(password, this.password);
// }

// User.prototype.correctPassword = function(enteredPassword) {
//     return User.encryptPassword(enteredPassword, this.salt()) === this.password()
// }

// <----------------------------- Password Encrypting ----------------------------->
// Funciones auxiliares para la encriptacion
// User.generateSalt = function () {
// 	return crypto.randomBytes(16).toString('base64');
// };
// User.encryptPassword = function (plainText, salt) {
// 	return crypto.createHash('RSA-SHA256').update(plainText).update(salt).digest('hex');
// };

// // Esta funcion se utiliza para corroborar si la contraseña que llega es igual a la almacenada en la base de datos a traves de la encriptacion
// User.prototype.correctPassword = function (enteredPassword) {
// 	return User.encryptPassword(enteredPassword, this.salt()) === this.password();
// };

// // Esta funcion es la que encripta el dato de la contraseña utilizando los hooks de mas abajo
// const setSaltAndPassword = (user) => {
// 	if (user.changed('password')) {
// 		user.salt = User.generateSalt();
// 		user.password = User.encryptPassword(user.password(), user.salt());
// 	}
// };

// // Hooks que se utilizan para encriptar el valor ingresado de contraseña antes de crearse por primera vez y cada vez que se actualiza
// User.beforeCreate(setSaltAndPassword);
// User.beforeUpdate(setSaltAndPassword);
// <----------------------------- Password Encrypting ----------------------------->

module.exports = {
	...sequelize.models, // para poder importar los modelos así: const { Product, User } = require('./db.js');
	conn: sequelize, // para importart la conexión { conn } = require('./db.js');
};
