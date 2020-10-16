const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
	sequelize.define('User', {
		// personId: {
		// 	type: DataTypes.INTEGER,
		// 	allowNull: false,
		// },
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
