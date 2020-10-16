const { Router } = require('express');
// import all routers;
const productRouter = require('./product.js');
const categoryRouter = require('./Category');
const userRouter = require('./User.js');

const router = Router();

// load each router on a route
// i.e: router.use('/auth', authRouter);
// router.use('/auth', authRouter);
router.use('/products', productRouter);
router.use('/products', categoryRouter);
router.use('/user', userRouter);

module.exports = router;
