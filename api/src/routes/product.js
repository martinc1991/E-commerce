const server = require('express').Router();
const { Product } = require('../db.js');
var body_parser = require('body-parser');
var create=201;

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
		res.status(400).send("Datos incompletos");
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
		where:req.body.name
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
		}).then(res.status(create).send("Producto Creado Correctamente."));

	})




});
