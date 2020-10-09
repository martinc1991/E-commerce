const server = require('express').Router();
const { Product } = require('../db.js');

// CODIGO VARIABLES DE STATUS
const OK = 200;
const CREATE_OK = 201;
const UPDATE = 204;
const ERROR = 400;
const NOT_FOUND = 404;
const ERROR_SERVER = 500;

server.get('/', (req, res, next) => {
	Product.findAll()
		.then(products => {
			res.status(OK);
			res.send( products);
		})
		.catch(next);
});







module.exports = server;
