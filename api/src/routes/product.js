const server = require('express').Router();
// const { INTEGER, STRING } = require('sequelize');
const { Product } = require('../db.js');
const {Op} = require('sequelize');

const server = require('express').Router(); //Import router from express module.
const { OK, CREATED, UPDATED, ERROR, NOT_FOUND, ERROR_SERVER } = require('../constants'); // Import Status constants.
const { Product } = require('../db.js'); // Import Products model.
const {Op} = require('sequelize'); // Import operator from sequelize module.

// Start routes

//// 'Get products' route in '/'
server.get('/', ( req, res ) => {
	return Product.findAll()
		.then(products => {
			res.status(OK).send( products);
		})
		.catch(err => {
            return res.status(ERROR_SERVER).json({
                message: 'Hubo un error en el servidor',
                data: err
            })
        })
});


	//s26
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
	});

	//s25
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

	//s27
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


	//s23
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

	//s24
	server.get('/:id', (req, res) =>{
	 //retorna un producto por id
	 const {id} = req.params;
// se hace commit para emparejar con sus cambios
	return Product.findOne({where:{id : id}} )

		// 						 include: [
								// 	 {
								// 		 model: Categories,
								// 		 as : "category",
								// 		 attributes: ...
								// 	 },
								//  ],


	 .then((products) => {
			 if(!products){
				 return res.status(NOT_FOUND).send(new Error('Not found!'))
			 }
		 res.status(OK).send({products});
	 })

	});




//// 'Add Category to a product' route in '/:product_id/category/:category_id'
server.put('/:product_id/category/:category_id', (req, res)=>{

	const { product_id, category_id } = req.params;

	Promise.all([ Product.findByPk(product_id), Categories.findByPk(category_id) ])
		.then(data =>{
			data[0].addCategories(data[1])
				.then(data => console.log(data))
				return res.send('OK')
		});
})

//// 'Remove Category to a product' route in '/:product_id/category/:category_id'
server.delete('/:product_id/category/:category_id', (req, res)=>{

	const { product_id, category_id } = req.params;

	Promise.all([ Product.findByPk(product_id), Categories.findByPk(category_id) ])
		.then(data =>{
			data[0].removeCategories(data[1])
				.then(data => console.log(data))
				return res.send('OK')
		});
})

//End routes
module.exports = server;
