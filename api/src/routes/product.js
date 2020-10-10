
const server = require('express').Router(); //Import router from express module.
const { OK, CREATED, UPDATED, ERROR, NOT_FOUND, ERROR_SERVER } = require('../constants'); // Import Status constants.
const { Product, Categories } = require('../db.js'); // Import Products model.
const {Op} = require('sequelize'); // Import operator from sequelize module.


// Start routes
//console.log("this " + Product.findAll().then(dta => console.log("Into the THEN")))
//// 'Get products' route in '/'
server.get('/', ( req, res ) => {
	//Product.findAll().then(products => res.status(STATUS.OK).json({message: 'Success',data: products})
	Product.findAll({
		include:Categories
	})
		.then(products => {
			return res.status(OK).json({
				message: 'Success',
				data: products
			})
		})
		.catch(err => {
            return res.status(ERROR_SERVER).json({
                message: 'Hubo un error en el servidor',
                data: err
            })
        })
});

//// 'Create product' route in '/'
server.post('/',function(req,res){
	const {name,description,price,stock,dimentions,image,sku} = req.body;

	return Product.create({ name, description, price, stock, dimentions, image,sku})
		.then( product => {
			return res.status(CREATED).json({
				message: 'Producto creado exitosamente!',
				data: product
			})
		})
		.catch(err => {
			return res.status(ERROR).json({
				message: 'Error al crear producto',
				data: err
			})
		});
});

//// 'Update product' route in '/:id'
server.put('/:id', ( req, res ) => {
	const { id } = req.params;
	const { name,description,price,stock,dimentions,image,sku} = req.body
	return Product.update(
		{ name, description, price, stock, dimentions, image,sku },
		{ where: { id } }
	)
	.then( product => {
		return res.status(UPDATED).json({
			message:`El ítem se ha actualizado correctamente!`,
			data: product
		});
	})
	.catch( err => {
		return res.status(ERROR).json({
			message: 'Error al modificar producto',
			data: err
		})
	});
});

server.get('/productID/:id', (req, res) =>{
	const {id} = req.params;

	return Product.findOne({where:{ id }} )
	.then( products => {
		return res.status(OK).json({
			message: 'Success',
			data: products
		})
	})
	.catch( err => {
		return res.status(NOT_FOUND).json({
			message: 'El ítem no se encuentra en la base de datos',
			data: err
		})
	});
});

//// 'Delete product' route in '/:id'
server.delete('/:id', ( req, res ) => {
	const { id } = req.params;

	return Product.destroy({ where: { id } })
	.then( deletedProduct => {
		return res.status(OK).json({
			message: 'Producto eliminado',
			data: deletedProduct
		});
	})
	.catch(err => {
		return res.status(ERROR_SERVER).json({
			message: 'Error al eliminar producto',
			data: err
		});
	});
});

//// 'Search product' route in '/search?query={value}'
server.get('/search', (req, res) =>{
	const value = req.query.query;

//SELECT name, describe FROM product WHERE name OR describe LIKE '%value%'
	if(!value || !isNaN(value)){
		return res.sendStatus(ERROR);
	}// Encuentra todos los valores de name y describe que coicidan con value
	return Product.findAll({
		where:{ [Op.or]:
			[
				{ name: value },
				{ describe: { [Op.like]: `%${value}%` } }
			]
		}
	})
	.then((products) => {
		return res.status(OK).json({
			message: 'Success',
			data: products
		});
	})
	.catch(err => {
		return res.status(NOT_FOUND).json({
			message: 'Failed',
			data: err
		})
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
