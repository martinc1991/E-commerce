const { Router } = require('express');
// import all routers;
const productRouter = require('./product');
const categoryRouter = require('./Category');
const userRouter = require('./User');
const orderRouter = require('./order');

const router = Router();

// load each router on a route
// i.e: router.use('/auth', authRouter);
// router.use('/auth', authRouter);
router.use('/products', productRouter);
router.use('/products', categoryRouter);
router.use('/users', userRouter);
router.use('/users', orderRouter);
module.exports = router;