const Sequelize = require('sequelize');
const { DataTypes } = require('sequelize');
const bcrypt = require('bcrypt');

module.exports = (sequelize) => {
	const User = sequelize.define('user', {
		name: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		email: {
			type: DataTypes.STRING,
			allowNull: false,
			unique: true,
		},
		password: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		role: {
			type: DataTypes.ENUM('client', 'admin', 'guest'),
			defaultValue: 'guest',
			allowNull: false,
		},
	});

	User.encryptPassword = function (password) {
		// Se genera un salt para la contrasenia
		var salt = bcrypt.genSaltSync(10);
		// Se hashea la contrasenia con el salt generado arriba
		return bcrypt.hashSync(password, salt);
	};
	User.comparePassword = function (password, userPassword) {
		// console.log(userPassword);
		// console.log(password);
		return bcrypt.compareSync(password, userPassword);
	};
};
