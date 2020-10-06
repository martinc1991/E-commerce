const { Datatypes } = require('sequelize');
const { conn } = require('../db');

const Category = conn.define('category', {
    category_name: {
        type: Datatypes.STRING,
        allowNull: false,
    }
});

module.exports = Category;