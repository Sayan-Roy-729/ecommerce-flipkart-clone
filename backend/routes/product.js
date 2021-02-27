const path = require('path');
const express = require('express');
const multer = require('multer');
const shortid = require('shortid');

// const categoryControllers = require('../controllers/category');
const productController = require('../controllers/product');
const authentication = require('../middlewares/isAauth');

const router = express.Router();

// ! Save files into system by using multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(path.dirname(__dirname), 'temp'));
  },
  filename: (req, file, cb) => {
    cb(null, shortid.generate() + '-' + file.originalname);
  },
});

const upload = multer({
  storage,
});

// ! /api/v1/category/create [POST]
router.post(
  '/create',
  authentication.requireSignin,
  authentication.adminMiddleware,
  upload.array('productPicture'),
  productController.createProduct
);

// api/v1/category/getcategory [GET]
// router.get('/getcategory', categoryControllers.getCategories);

module.exports = router;
