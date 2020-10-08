const server = require('express').Router();
const { Product } = require('../db.js');
var body_parser = require('body-parser');

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



server.post('/',function(req,res){
	if(!req){
		res.status(ERROR).send("Datos incompletos");
	}
	const {name,description,price,stock,dimention,rating,thumbnail}=req.body
	
	console.log("entro al post");
	Product.create({
		
		name:name,
		description:description,
		price:price,
		stock:stock,
		dimention:dimention,
		rating:rating,
		thumbnail:thumbnail
		
	}).then((products)=>{
		return res.status(CREATE_OK).json({message:"Producto Creado Correctamente.",data:products})
	});
	

});
module.exports = server;
