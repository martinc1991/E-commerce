const server = require('express').Router();
const { Categories } = require('../db.js');


const OK = 200;
const CREATE_OK = 201;
const UPDATE = 204;
const ERROR = 400;
const NOT_FOUND = 404;
const ERROR_SERVER = 500;

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

//s22
 server.get('/category/:name', (req, res) =>{
 	//retornar todos los productos de una categoria
 	const {name} = req.params;

return Categories.findOne({
                where:{
                   name: name
                 }
               })

 	.then((products) => {
      if(!products){
        return res.status(NOT_FOUND).send(new Error('Not found!'))
      }
    res.status(OK).send('Los productos guardados:', {products});
 	})

 });



module.exports = server;
