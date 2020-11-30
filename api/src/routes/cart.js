const server = require('express').Router(); //Import router from express module.
const { Order, Order_line, Product, User } = require('../db.js'); // Import Categories model.
const { OK, CREATED, ERROR, ERROR_SERVER } = require('../constants/index'); // Import Status constants.

// Start Routes

//// 'Create Order' route in '/'
server.post('/:userId/cart', function (req, res) {
    console.log(req.body)
    // return res.send(req.body)
	 const { userId } = req.params;
	 console.log(userId)
     const { id, qty } = req.body
	 const newOrder = Order.findOrCreate({ where: { userId } });
	 const newProduct = Product.findOne({ where: {id: id} });
	 Promise.all([ newOrder,  newProduct])
	 .then((data) => {
	 	data[0][0].addProducts(data[1], { through: { price: data[1].price, quantity: qty } })
	 	.then(()=>{ Order.findOne({ where: { userId }, 	include: [{ model: Product }, { model: User } ] }).then(order => { 			return res.status(OK).json({ 				message: "ítem añadido al carrito", 				data: order 			})
	 		})
 	    })
	 })
	 .catch((err) => {
	 	res.send({errro: 'Error POST'})
	 });
});

//// 'Edit quantity in order_line' route in '/users/:userId/cart'
server.put('/:userId/cart', function (req, res) {

	const { userId } = req.params;
	const { id, qty } = req.body;

	Promise.all([Product.findOne({ where: { id }}), Order.findOne({where: { userId }})])
	.then(data => {
		data[0].setOrders(data[1], { through: { quantity: qty }})
		.then(()=>{
			Order.findOne({
				where: { userId },
				include: [{ model: Product }, { model: User } ]
			})
			.then(order => {
				return res.status(OK).json({
					message: "Cantidad del ítem modificada correctamente",
					data: order
				})
			})
		})
	})
	.catch(err => {
		console.log(err);
	}) 	
});

server.delete('/:userId/cart', ( req, res ) => {
	const { userId } = req.params;
	console.log(userId)
	Order.findAll({ where: { userId } })
	.then( deletedCart => {
		deletedCart.destroy();
		return res.status(OK).json({
			message: 'Elementos eliminados',
			data: deletedCart
		});
	})
	.catch(err => {
		console.log('Entre l catch de delete cart')
		return res.status(ERROR_SERVER).json({
			message: 'Error al eliminar carrito',
			data: err
		});
	});
});

//// 'remove items from cart' route in '/users/:userId/cart'
server.delete('/:userId/cart/:idProduct', function (req, res) {
	console.log(req.params)
	const { userId, idProduct } = req.params;
	 console.log(req.query)
	 const {id}  = req.body;
	 Promise.all([Order.findOne({where: { userId }}),  Product.findOne({ where: { id: idProduct }})])
	 .then(data => {
	 	data[0].removeProducts(data[1])
	 	.then(()=>{
	 		Order.findOne({
	 			where: { userId },
	 			include: [{ model: Product }, { model: User } ]
	 		})
	 		.then(order => {
	 			return res.status(OK).json({
	 				message: "Ítem eliminado correctamente del carrito",
	 				data: order
	 			})
	 		})
	 	})
	 })
	 .catch(err => {
	 	console.log(err);
	 }) 	
});



module.exports =  server
