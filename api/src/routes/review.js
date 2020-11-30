const server = require('express').Router(); //Import router from express module.
const { OK, CREATED, UPDATED, ERROR, NOT_FOUND, ERROR_SERVER } = require('../constants'); // Import Status constants.

const { Product, User, Review, Categories} = require('../db.js'); // Import Products model.
const {Op} = require('sequelize'); // Import operator from sequelize module.

server.get('/:productId/review', (req, res) =>{

	const {productId} = req.params;
	console.log('yah');
	return Review.findAll({
        where: {productId},
        include: Product
	})
	.then(reviews => {
		return res.status(OK).json({
			message: 'Success',
			data: reviews
		})
	})
	.catch( err => {
		return res.status(NOT_FOUND).json({
			message: 'El review no se encuentra en la base de datos',
			data: err
		})
	});
});
server.get('/:productId/review/user/:userId', (req, res) =>{

	const {productId, userId} = req.params;
	console.log('yah');
	return Review.findAll({
        where: {productId, userId},
	})
	.then(reviews => {
		console.log('**********')
		console.log(reviews)
		console.log('**********')
		return res.status(OK).json({
			message: 'Success',
			data: reviews
		})
	})
	.catch( err => {
		console.log('**********')
		console.log(err)
		console.log('**********')
		return res.status(NOT_FOUND).json({
			message: 'El review no se encuentra en la base de datos',
			data: err
		})
	});
});

server.post('/:productId/review', (req, res) => {
	const {productId} = req.params;
	const {title, content, rate, userId} = req.body;
	console.log(req.body)

	return Review.create({ productId, title, content, rate, userId})
	.then(() => {
       return Product.findAll({
            include:[{model:Categories},{model: Review}]
        })
        .then((products)=>{
            return res.status(OK).json({
                message: 'Review creada exitosamente!',
                data: products
            })            
        })		
	})
	.catch(err => {
		console.log(err)
		return res.status(ERROR).json({
			message: 'Error al crear review',
			data: err
		})
	});
});


server.put('/:productId/review/:id', (req, res) => {
	const {productId, id} = req.params;
	const {title, content, rate, creator_id } = req.body;

	Review.findOne({
		where: { productId, id },
		include: Product
	})
	.then(review => {
		review.title =  title;
		review.content = content;
		review.rate = rate;
		review.save();
		return res.status(OK).json({
			message: 'Review actualizada correctamente!', 
			data: review 
		})
	})
	.catch(err => {
		return res.status(ERROR).json({
			message: 'Hubo un error al modificar la review',
			data: err
		})
    })
});

server.delete('/:productId/review/:id', (req, res) => {
	const {productId, id} = req.params;

	Review.findOne({
		where: { productId, id },
		include: Product
	})
	.then(review => {
		review.destroy();
		return res.status(OK).json({
			message: 'Review elimanada correctamente!', 
			data: review 
		})
	})
	.catch(err => {
		return res.status(ERROR).json({
			message: 'Hubo un error al eliminar la review',
			data: err
		})
    })
});

module.exports = server;