const express = require('express');

const cartControllers = require('../controllers/cart');
const authentication = require('../middlewares/isAauth');

const router = express.Router();

// /api/v1/user/cart/addtocart [POST]
router.post('/addtocart', authentication.requireSignin, authentication.userMiddleware , cartControllers.addItemToCart);


module.exports = router;