const { DataTypes, Sequelize } = require("sequelize");
const { conn } = require("../db");

module.exports = (sequelize) => {
    sequelize.define('categories', {
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                isAlphanumeric: true
            }
        }
    });
};