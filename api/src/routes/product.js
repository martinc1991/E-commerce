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

module.exports = server;

server.post('/',function(req,res){
	if(!req){
		res.status(ERROR).send("Datos incompletos");
	}
	var skun=req.body.skun;	
	var name=req.body.name;
	var description=req.body.description;
	var price= req.body.price;
	var dimension=req.body.dimension;
	var category_id=req.body.category_id;
	var stock=req.body.stock;
	var assessment=req.body.assessment;

	Product.findOrCreate({
		where:req.body.skun
	}).then(function(products){
		return Product.Create({
			skun:skun,
			name:name,
			description=description,
			price:price,
			dimension:dimension,
			category_id:category_id,
			stock:stock,
			assessment:assessment
		}).then((products)=>{
			res.status(CREATE_OK).send("Producto Creado Correctamente.",products)
		});

	});
});
