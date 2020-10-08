const server = require('express').Router();
const { Product } = require('../db.js');
const OK = 200;
const CREATE_OK = 201;
const ERROR = 400;
const NOT_FOUND = 404;
const ERROR_SERVER = 500;

server.get('/', (req, res, next) => {
	Product.findAll()
		.then(products => {
			res.send(products);
		})
		.catch(next);
});

server.put('/:id', function (req, res) {
	const idProduct = req.params.id;
	Product.update({
		name: req.body.name,
		description:req.body.description,
		price:req.body.price,
		stock:req.body.stock,
		dimentions:req.body.dimentions,
		rating:req.body.rating

	},
		{
		where: {
			id: idProduct,
		}
	}).then(function(producto){
		res.status(OK).send({producto});
	});
});

module.exports = server;
