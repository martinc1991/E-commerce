const server = require('express').Router();
const { Product } = require('../db.js');
const eliminar = 200;
const badRequest =400;

server.get('/', (req, res, next) => {
	Product.findAll()
		.then(products => {
			res.send(products);
		})
		.catch(next);
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
			if(rowDeleted === 1){ 
				console.log('Deleted successfully'); 
				res.status(eliminar).send('Deleted successfully');
			}else {
				res.status(badRequest).send('Deleted successfully');
			}

		});
})

module.exports = server;
