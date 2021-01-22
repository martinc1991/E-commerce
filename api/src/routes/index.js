const { Router } = require('express');
// Import all routers;
const productRouter = require('./productsRoutes');
const categoryRouter = require('./categoriesRoutes');
const userRouter = require('./usersRoutes');
const cartRouter = require('./cartRoutes');
const orderRouter = require('./ordersRoutes');
const reviewRouter = require('./reviewsRoutes');
// Populate router
const populateRouter = require('./populateRoutes');

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
// Populate
router.use('/populate', populateRouter);

module.exports = router;
