const DataTypes = require('sequelize');

module.exports = (sequelize) => {

//modelo
sequelize.define('order' , {

key: {
  type: DataTypes.INTEGER,
  allowNull: false,
  unique: true
},
price:{
  type: DataTypes.DECIMAL,
  allowNull:false,
  validate:{
    isNumeric: true,
    isDecimal: true
  },
  quantity: DataTypes.INTEGER,
  allowNull: false
},
total:{
  type: DataTypes.DECIMAL,
  allowNull: false
},
date: {
type: DataTypes.DATE,
allowNull: false
},
status:{
  type: DataTypes.STRING,
  allowNull:false
}
});
};
