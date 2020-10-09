const server = require('express').Router(); //Import router from express module.
const { Categories } = require('../db.js'); // Import Categories model.
const { OK, CREATED, UPDATED, ERROR, NOT_FOUND, ERROR_SERVER } = require('../constants'); // Import Status constants.

// Start Routes

//// 'Create Category' route in '/products/category'
server.post('/category/', ( req, res ) => {
    const { name, description } = req.body;

    return Categories.create({ name, description })
        .then( newCategory => {
            return res.status(CREATED).json({
                message: `La categoria ${newCategory.name} ha sido creada exitosamente`,
                data: newCategory
            });
        })
        .catch(err =>{
            return res.status(ERROR).json({
                message: 'Hubo un error al crear la categoría',
                data: err
            });
        });
});

//// 'Get Category' route in '/products/category/:name'
server.get('/category/:name', (req, res) =>{
    const {name} = req.params;

    return Categories.findOne({ where:{ name } })
        .then( category => {
            return res.status(OK).json({
                message: 'Success',
                data: category
            });
        })
        .catch(err => {
            return res.status(NOT_FOUND).json({
                message: `La categoría ${name} todavía no ha sido creada`,
                data: err
            })
        })
});

//// 'Update Category' route in '/products/category/:id'
server.put('/category/:id', (req, res) => {
    const { id } = req.params;
    const { name, description } = req.body;
    return Categories.findOne({ where:{ id } })
         .then(category => {             
            let oldCategory = category;
            category.name = name;
            category.description = description;
            category.save()
            return res.status(UPDATED).json({
                    message:`Se ha actualizado la categoria ${oldCategory.name} a ${category.name} correctamente!`,
                    data: category
            }); 
         })
         .catch(err => {
            return res.status(ERROR).json({
                message: 'Hubo un error al modificar la Categoría',
                data: err
            })
        })
 });

//// 'Remove Category' route in '/products/category/:id'
server.delete('/category/:id', (req, res, next) => {
    const { id } = req.params;
    return Categories.findOne({ where:{ id } })
         .then(category => {
             let removedCategory = category;
             category.destroy()
             return res.json({
                 message: `Se eliminó correctamente la categoría ${removedCategory.name}`,
                 data: removedCategory
            });
         })
         .catch(err => {
            return res.status(ERROR_SERVER).json({
                message: 'Error al eliminar la categoría',
                data: err
            })
        })
 });

// End Routes

module.exports = server;
