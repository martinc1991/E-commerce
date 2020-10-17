const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
	sequelize.define('User', {
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
			type: DataTypes.ENUM('client', 'admin'),
			allowNull: false,
		},
	});
};
