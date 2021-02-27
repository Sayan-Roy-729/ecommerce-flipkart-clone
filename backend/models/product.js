const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const productSchema = Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
    },
    quantity: {
      type: Number,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    offer: {
      type: Number,
    },
    productPictures: [{ img: { type: String } }],
    reviews: [
      {
        userId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'User',
        },
        review: String,
      },
    ],
    category: {
      required: true,
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Category',
    },
    createdBy: {
      required: true,
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    updatedAt: Date,
  },
  { timestamps: true }
);

module.exports = mongoose.model('Product', productSchema);
