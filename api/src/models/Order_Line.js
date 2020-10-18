const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
//modelo
  sequelize.define('order_line' , {
    price:{
      type: DataTypes.INTEGER,
      allowNull: false
    },
    quantity:{
      type: DataTypes.INTEGER,
      allowNull: false
    },
  });
};