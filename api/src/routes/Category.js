const server = require('express').Router();
const { Categories } = require('../db.js');

server.post('/category/', (req, res, next) => {
    Categories.create({
        name: req.body.name,
        description: req.body.description
    })
    .then((newCategory)=>{
        return res.send(`La categoria ${newCategory.name} ha sido creada exitosamente`)
    })
    .catch(next); 
		
});



module.exports = server;