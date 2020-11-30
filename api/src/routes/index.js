const { Router } = require('express');
// import all routers;
const productRouter = require('./product');
const categoryRouter = require('./Category');
const userRouter = require('./User');
const cartRouter = require('./cart');
const orderRouter = require('./order');
const reviewRouter = require('./review')

const router = Router();

// load each router on a route
// i.e: router.use('/auth', authRouter);
// router.use('/auth', authRouter);
router.use('/products', productRouter);
router.use('/products', categoryRouter);
router.use('/users', userRouter);
router.use('/users', cartRouter);
router.use('/orders', orderRouter);
router.use('/product', reviewRouter);

module.exports = router;