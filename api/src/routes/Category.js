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

server.delete('/category/:id', (req, res, next) => {
    return Categories.findOne({
         where:{
             id: req.params.id
         }
     })
         .then(category => {                      
             var categoryName = category.name;
             category.destroy()
             return res.send(`Se elimino la categoria ${categoryName}`)
             
         })
         
         .catch(next);
 });

server.put('/category/:id', (req, res, next) => {
    return Categories.findOne({
         where:{
             id: req.params.id
         }
     })
         .then(category => {             
            var categoryName = category.name;
            category.name = req.body.name;
            category.description = req.body.description;
            category.save()
            return res.send(`Se ha modificado la categoria ${categoryName} correctamente`)
             
         })
         .catch(next);
 });

module.exports = server;