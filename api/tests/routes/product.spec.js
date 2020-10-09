/* eslint-disable import/no-extraneous-dependencies */
const { expect } = require('chai');
const session = require('supertest-session');
const app = require('../../src/app.js');
const { Product, conn } = require('../../src/db.js');

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
