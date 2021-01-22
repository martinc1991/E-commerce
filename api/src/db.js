require('dotenv').config();
const { Sequelize } = require('sequelize');
const fs = require('fs');
const path = require('path');
// const bcrypt = require('bcrypt');
const { DB_USER, DB_PASSWORD, DB_HOST } = process.env;
// console.log(DB_USER, DB_PASSWORD, DB_HOST);
// Password Encrypting
// const crypto = require('crypto');

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
// console.log(sequelize.models);

// RELACIONES ENTRE LAS TABLAS
Product.belongsToMany(Order, { through: Order_line });
Order.belongsToMany(Product, { through: Order_line });

//Review to product
Product.hasMany(Review);
Review.belongsTo(Product);

//Review user
User.hasMany(Review);
Review.belongsTo(User);

// Productos y categorias
Product.belongsToMany(Categories, { through: 'Product_Category' });
Categories.belongsToMany(Product, { through: 'Product_Category' });
User.hasMany(Order);
Order.belongsTo(User);

module.exports = {
	...sequelize.models, // para poder importar los modelos así: const { Product, User } = require('./db.js');
	conn: sequelize, // para importart la conexión { conn } = require('./db.js');
};
