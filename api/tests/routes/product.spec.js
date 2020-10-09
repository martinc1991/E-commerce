/* eslint-disable import/no-extraneous-dependencies */
const { expect } = require('chai');
const session = require('supertest-session');
const app = require('../../src/app.js');
const { Product, conn } = require('../../src/db.js');

const OK = 200;
const CREATE_OK = 201;
const ERROR = 400;
const NOT_FOUND = 404;
const ERROR_SERVER = 500;

const agent = session(app);
const product = {
  name: 'producto',
};

const OK = 200;
const CREATE_OK = 201;
const ERROR = 400;
const NOT_FOUND = 404;
const ERROR_SERVER = 500;

describe('PRODUCT routes', () => {
  before(() => conn.authenticate()
  .catch((err) => {
    console.error('Unable to connect to the database:', err);
  }));
  beforeEach(() => Product.sync({ force: true })
    .then(() => Product.create(product)));
  describe('GET /products', () => {

    it('should get 200', () =>
      agent.get('/products/').expect(OK)
    );

    it('should get 200', () =>{
      agent.get('/products/').expect(OK)
    });
  });
});

describe('GET/category/:category_id', () => {
  it('Respond with 404 when the category dont exist', () => {
    return agent.get('/category/not_found')
    .expect(NOT_FOUND);
  });
  it('Respond 200 la categoria existe', () => {
        return Product.findOne({
                      where: {
                        category_pro_id: '1'
                        },
    }).then(function (product) {
        product.get('id'); // === Auto-generated ID
        product.get('category_pro_id'); // === 'Audifonos'
        })
      .then(() => {
        return agent.get('/category/1')
        .expect(OK);
      })
  });

});

describe('GET /search', () => {
  it('respond with 200', () => agent.get('/search?=query={value}').expect(OK));

  it('Respond with 400 when the result is not find', () => {

  return  Product.$useHandler(function(query, queryOptions, done) {
    if (query === 'findAll') {
        if (queryOptions[0].where.id === 3) {
            // Result found, return it
            return Product.build({ id: 3, name: 'case' });
        } else {
            // No results
            return null;
        }
    }
});

Product.findAll({where: {id: 3}}).then(function (Product) {
    product.get('id'); // === 1337
    product.get('name'); // === 'foo'
});
Product.findAll({where: {id: 1}}).then(function (product) {
    product // === null
});

//     return Product.findOne({
//                   where: {
//                     name: 'Audifonos'
//                     },
// }).then(function (product) {
//     product.get('id'); // === Auto-generated ID
//     product.get('name'); // === 'Audifonos'
//     });


  it('Respond with 400 when value is empty', () =>
    agent.get('/search').expect(ERROR)
  );


  });
});
//
// describe('GET/category/:category_id', () => {
//   it('Respond 404 la categoria no existe', () => {
//     return agent.get('/category/not_found')
//     .expect(NOT_FOUND);
//   });
//   it('Respond 200 la categoria existe', () => {
//       return Product.create({
//         name: 'Audifonos',
//         price: '2000',
//       })
//       .then(() => {
//         return agent.get('/category/1')
//         .expect(OK);
//       })
//   });
//
// });
