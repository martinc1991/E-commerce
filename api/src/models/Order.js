const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
	//modelo
	sequelize.define('order', {

    subTotal: {
      type: DataTypes.DECIMAL,
      validate: {
        isNumeric: true,
        isDecimal: true
      }
    },
    shipping: {
      type: DataTypes.DECIMAL,
      isNumeric: true,
      isDecimal: true
    },
    discount: {
      type: DataTypes.STRING,
      unique: true
    },
    total:{
      type: DataTypes.DECIMAL,
      validate: {
        isNumeric: true,
        isDecimal: true
      }
    },
		date_placed: {
			type: DataTypes.DATE,
    },
    date_filled: {
      type: DataTypes.DATE,
    },
		status: {
      type: DataTypes.ENUM(['cart', 'created', 'in_process', 'fullfilled', 'rejected']),
			defaultValue: 'cart',
			allowNull: false,
		},
	});
};

