const slugify = require('slugify');

const Category = require('../models/category');
const { deleteFile } = require('../functions/deleteFile');
const { moveFile } = require('../functions/moveFile');

// ! Create new Category
exports.addCategory = (req, res, next) => {
  // Validation Check
  if (!req.body.name) {
    if (req.file) deleteFile(req.file.filename);
    const error = new Error('name is required');
    error.statusCode = 403;
    throw error;
  }

  // Create obj for saving data into database
  const categoryObj = {
    name: req.body.name,
    slug: slugify(req.body.name),
  };

  // if file exists, the modify it
  if (req.file) {
    moveFile(req.file.filename);
    categoryObj.categoryImage =
      process.env.API + '/public/' + req.file.filename;
  }

  // If some category is sub category of a parent category, then add that object ID to the object
  if (req.body.parentId) {
    categoryObj.parentId = req.body.parentId;
  }

  // Save the data into database
  const cat = new Category(categoryObj);
  cat.save((error, category) => {
    if (error) return res.status(400).json({ error });
    if (category) {
      return res.status(201).json({ category });
    }
  });
};

// ! Create Category List of to pull out Categories, Sub Categories, Sub Sub Categories
function createCategories(categories, parentId = null) {
  const categoryList = [];
  let category;
  if (parentId == null) {
    category = categories.filter((cat) => cat.parentId == undefined);
  } else {
    category = categories.filter((cat) => cat.parentId == parentId);
  }

  for (let cate of category) {
    categoryList.push({
      _id: cate._id,
      name: cate.name,
      slug: cate.slug,
      parentId: cate.parentId,
      type: cate.type,
      children: createCategories(categories, cate._id),
    });
  }
  return categoryList;
}

// ! Get All Categories
exports.getCategories = (req, res, next) => {
  Category.find().exec((error, categories) => {
    if (error) return res.status(404).json({ error });
    if (categories) {
      const categoryList = createCategories(categories);
      console.log(categoryList);
      res.status(200).json({ categoryList });
    }
  });
};

exports.updateCategories = async (req, res, next) => {
  console.log('category.js', req);
  const { _id, name, parentId, type } = req.body;
  const updatedCategories = [];
  if (name instanceof Array) {
    for (let i = 0; i < name.length; i++) {
      const category = {
        name: name[i],
        type: type[i],
      };
      if (parentId == '') {
        category.parentId = parentId[i];
      }
      const updatedCategory = await Category.findOneAndUpdate(
        { _id },
        category,
        { new: true }
      );
      updatedCategories.push(updatedCategory);
      return res.status(201).json({ updatedCategories });
    }
  } else {
    const category = {
      name,
      type,
    };
    if (parentId !== '') {
      category.parentId = parentId;
    }
    const updatedCategory = await Category.findOneAndUpdate({ _id }, category, {
      new: true,
    });
    return res.status(201).json({ updatedCategory });
  }
};
