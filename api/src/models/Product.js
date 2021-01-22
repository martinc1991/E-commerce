const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
	// defino el modelo
	sequelize.define(
		'product',
		{
			sku: {
				type: DataTypes.STRING,
			},
			name: {
				type: DataTypes.STRING,
				allowNull: false,
				unique: true,
			},
			description: {
				type: DataTypes.TEXT,
			},
			price: {
				type: DataTypes.DECIMAL,
				allowNull: false,
				validate: {
					isNumeric: true,
					isDecimal: true,
				},
			},
			dimentions: {
				type: DataTypes.TEXT,
			},
			stock: {
				type: DataTypes.INTEGER,
				allowNull: false,
			},
			rating: {
				type: DataTypes.FLOAT,
			},
			image: {
				type: DataTypes.TEXT,
			},
		},
		{ timestamps: false }
	);
};
