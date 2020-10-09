const server = require('express').Router();
const { INTEGER, STRING } = require('sequelize/types');
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

server.patch('/:id', function (req, res) {
	
	const idProduct = req.params.id;
	
	Product.update({

		name: req.body.name,
		description:req.body.description,
		price:req.body.price,
		stock:req.body.stock,
		dimention:req.body.dimention,
		rating:INTEGER,
		thumbnail:STRING

	},
		{
		where: {
			id: idProduct,
		}
	}).then(function(producto){
		res.status(OK).json({message:"producto Modificado correctamente",producto});
	}).catch(
		function(error){
			console.log("error al modificar producto",error);
			res.status(ERROR_SERVER).json({message:"error al modificar el producto",error})
		}
	);
});

module.exports = server;
