const { DataTypes, Sequelize } = require("sequelize");

module.exports = (sequelize) => {
    sequelize.define('User', {
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
            type:DataTypes.ENUM,
            allowNull:false,
        }
    });
};