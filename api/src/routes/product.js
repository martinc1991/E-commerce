const server = require('express').Router();
const { default: Categorys } = require('../../../client/src/components/AdminForm/Categorys.jsx');
const { Product } = require('../db.js');

server.get('/', (req, res, next) => {
	Product.findAll()
		.then(products => {
			res.send(products);
		})
		.catch(next);
});




module.exports = server;
