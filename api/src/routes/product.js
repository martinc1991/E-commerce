const server = require('express').Router();
const { INTEGER, STRING } = require('sequelize/types');
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
			res.status(OK);
			res.send( products);
		})
		.catch(next);
});

<<<<<<< HEAD
//s23
=======
server.put('/:id', function (req, res) {
	
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
});

server.post('/',function(req,res){
	if(!req){
		res.status(ERROR).send("Datos incompletos");
	}
	const {name,description,price,stock,dimention,rating,thumbnail}=req.body
	
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

server.delete('/:id',function(req,res,next){
	var idProducto = req.params.id;

	Product.destroy({ 
		where: 
			{ 
				id: idProducto //this will be your id that you want to delete 
			}
		}).then(function(rowDeleted){ 
			// rowDeleted will return number of rows deleted 
			if(rowDeleted >= 1){ 
				console.log('Deleted successfully'); 
				res.status(OK).json({message:'Deleted successfully',rowDeleted});
			}else {
				res.status(ERROR).json({message:'Deleted failed',rowDeleted});
			}

		});
})

>>>>>>> master
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
<<<<<<< HEAD

});

//s24
server.get('/:id', (req, res) =>{
 //retorna un producto por id
 const {id} = req.params;

return Product.findOne({
							 where:{
									id: id
								}
							})

 .then((products) => {
		 if(!products){
			 return res.status(NOT_FOUND).send(new Error('Not found!'))
		 }
	 res.status(OK).send({products});
 })

});


server.post('/' , (req, res) => {
	Product.create({
		name: req.body.name,
		description:req.body.description,
		price: req.body.price,
		stock: req.body.stock
	})
	.then((product) => {
		return res.status(OK).json(product)
	})
})




=======
});
>>>>>>> master

module.exports = server;
