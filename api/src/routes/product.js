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
