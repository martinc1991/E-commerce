const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
	//modelo
	sequelize.define('order', {

    city: {
      type: DataTypes.STRING,
    },
    adress: {
      type: DataTypes.STRING,
    },
    phone: {
      type: DataTypes.STRING,
    },
    postal: {
      type: DataTypes.STRING,
    },
    total:{
      type: DataTypes.DECIMAL,
      validate: {
        isNumeric: true,
        isDecimal: true
      }
    },
    subTotal:{
      type: DataTypes.DECIMAL,
      validate: {
        isNumeric: true,
        isDecimal: true
      }
    },
    iva:{
      type: DataTypes.DECIMAL,
      validate: {
        isNumeric: true,
        isDecimal: true
      }
    },
    paymentMethod: {
      type: DataTypes.STRING,
    },
		status: {
      type: DataTypes.ENUM(['cart', 'created', 'in_process', 'fullfilled', 'rejected']),
			defaultValue: 'cart',
			allowNull: false,
		},
	});
};

