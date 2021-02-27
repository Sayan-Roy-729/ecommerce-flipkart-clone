const path = require('path');
const fs = require('fs');
const slugify = require('slugify');

const Product = require('../models/product');
const { deleteFile } = require('../functions/deleteFile');
const { moveFile } = require('../functions/moveFile');

// // ! delete files function
// const deleteFile = (files) => {
//   for (file of files) {
//     const filePath = path.join(path.dirname(__dirname), 'temp', file.img);
//     fs.unlink(filePath, (error) => {
//       if (error) throw error;
//     });
//   }
// };

// ! Cheate new product
exports.createProduct = (req, res, next) => {
  const { name, price, description, category, quantity } = req.body;
  let productPictures = [];

  // create database sutable format
  if (req.files.length > 0) {
    productPictures = req.files.map((file) => {
      return { img: file.filename };
    });
  }

  // check productPictures validation
  if (productPictures.length <= 0) {
    const error = new Error('productPicture is required. (Atleast one file)');
    error.statusCode = 403;
    throw error;
  }

  // Check name validation
  if (!name) {
    deleteFile(productPictures);
    const error = new Error('name is required');
    error.statusCode = 403;
    throw error;
  }

  // Check price validation
  if (!price && price <= 0) {
    deleteFile(productPictures);
    const error = new Error('price is required and must be greater than 0');
    error.statusCode = 403;
    throw error;
  }

  // check description validation
  if (!description) {
    deleteFile(productPictures);
    const error = new Error('description is required');
    error.statusCode = 403;
    throw error;
  }

  // check category validation
  if (!category) {
    deleteFile(productPictures);
    const error = new Error('category is required');
    error.statusCode = 403;
    throw error;
  }

  // check quantity validation
  if (!quantity && quantity <= 0) {
    deleteFile(productPictures);
    const error = new Error(
      'quantity is required and value must be greater than 0'
    );
    error.statusCode = 403;
    throw error;
  }

  // After all validation, load files from temp to uploads folder
  moveFile(productPictures);
  // for (file of productPictures) {
  //   const oldFile = path.join(path.dirname(__dirname), 'temp', file.img);
  //   const newFile = path.join(path.dirname(__dirname), 'uploads', file.img);

  //   fs.rename(oldFile, newFile, (error) => {
  //     if (error) throw error;
  //   });
  // }

  // Save files into database
  const product = new Product({
    name: name,
    slug: slugify(name),
    price,
    description,
    productPictures,
    category,
    quantity,
    createdBy: req.user._id,
  });

  product.save((error, product) => {
    if (error) return res.status(400).json({ error });
    if (product) {
      res.status(201).json({ product });
    }
  });
};
