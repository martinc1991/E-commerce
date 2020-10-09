const { DataTypes, DECIMAL } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('product', {
    skun:{
      type: DataTypes.STRING,
      allowNull:false,
      unique:false
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: false
    },
    description:{
      type: DataTypes.STRING,
    },
    price:{
      type: DataTypes.DECIMAL,
      allowNull: false,
      validate:{
        isNumeric: true,
        isDecimal: true
      }    
    },
    dimentions:{
      type: DataTypes.TEXT
    },
    rating:{
      type:DataTypes.DECIMAL
    },
    thumbnail:{
      type:DataTypes.TEXT
    },
    stock:{
      type: DataTypes.INTEGER,
      allowNull: false      
    },
    cart_id:{
      type:DataTypes.INTEGER
    }
    
  });
};
