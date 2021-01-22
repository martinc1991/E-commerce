const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
	sequelize.define('review', {
		title: {
			type: DataTypes.STRING,
			alloNull: false,
		},
		rate: {
			type: DataTypes.INTEGER,
			allowNull: false,
			validate: {
				isNumeric: true,
			},
		},
		content: {
			type: DataTypes.TEXT,
			alloNull: false,
		},
	});
};
