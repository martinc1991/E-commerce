const server = require('express').Router();
const { Product } = require('../db.js');
const {Op} = require('sequelize');

// CODIGO VARIABLES DE STATUS
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

server.get('/category/:category_id', (req, res) =>{
	//retornar todos los productos de una categoria
	const {category_id} = req.params;

	Product.findByFK(category_id,{
					include: {
					model: category_pro_id
					}
	})// revisar si se debe retornar solo el nombre o todos
	//los detalles del producto
	.then((products) => {
		res.status(OK).send('Los productos guardados serian:', {products});
	})

});



server.get('/search', (req, res) =>{
	const value = req.query.query;

//SELECT name, describe FROM product WHERE name OR describe LIKE '%value%'
	if(!value || !isNaN(value)){
		return res.sendStatus(ERROR);
	}// Encuentra todos los valores de name y describe que coicidan con value
	Product.findAll({WHERE:{
		[Op.or]:[{name: value}, {describe: value}],
		[Op.like]:'%value%'
	}
})
.then((values) => {
		res.status(OK).send({values})
		})

});













module.exports = server;
