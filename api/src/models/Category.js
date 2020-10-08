const { DataTypes, Sequelize } = require("sequelize");

module.exports = (sequelize) => {
    sequelize.define('categories', {
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                isAlphanumeric: true
            }
        },
        description: {
            type: DataTypes.TEXT,
        }
    });
};
//
// const { Datatypes } = require('sequelize');
// const { conn } = require('../db');
//
//
// const Category = conn.define('category', {
//     category_name: {
//         type: Datatypes.STRING,
//         allowNull: false,
//     }
// });
//
// module.exports = Category;
