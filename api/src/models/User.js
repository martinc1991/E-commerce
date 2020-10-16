const { DataTypes, Sequelize } = require("sequelize");

module.exports = (sequelize) => {
    sequelize.define('user', {
        personId:{
            type:DataTypes.INTEGER,
            allowNull:false,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        password: {
            type: DataTypes.STRING,
        },
        role:{
            type:DataTypes.ENUM('Admin', 'Client'),
            allowNull:false
        }
    });
};
