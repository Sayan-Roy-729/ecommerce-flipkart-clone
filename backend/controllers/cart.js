const Cart = require('../models/cart');

// ! Add to cart
exports.addItemToCart = (req, res, next) => {
  Cart.findOne({ user: req.userId }).exec((error, cart) => {
    if (error) return res.status(400).json({ message: error });
    if (cart) {
      // if cart already exists, then update cart by quantity
      const product = req.body.cartItems.product;
      const item = cart.cartItems.find((c) => c.product == product);
      let condition, update;

      if (item) {
        condition = { user: req.userId, 'cartItems.product': product };
        update = {
          $set: {
            'cartItems.$': {
              ...req.body.cartItems,
              quantity: item.quantity + req.body.cartItems.quantity,
            },
          },
        };

        Cart.findOneAndUpdate(
          { user: req.userId, 'cartItems.product': product },
          {
            $set: {
              'cartItems.$': {
                ...req.body.cartItems,
                quantity: item.quantity + req.body.cartItems.quantity,
              },
            },
          },
          { new: true, useFindAndModify: false }
        ).exec((error, _cart) => {
          if (error) return res.status(400).json({ message: error });
          if (_cart) {
            res.status(200).json({
              cart: _cart,
            });
          }
        });
      } else {
        condition = { user: req.userId };
        update = {
          $push: {
            cartItems: [req.body.cartItems],
          },
        };
      }

      Cart.findOneAndUpdate(condition, update).exec((error, _cart) => {
        if (error) return res.status(400).json({ message: error });
        if (_cart) {
          res.status(200).json({
            cart: _cart,
          });
        }
      });

      // res.status(200).json({ message: cart });
    } else {
      const cart = new Cart({
        user: req.userId,
        cartItems: req.body.cartItems,
      });

      cart.save((error, cart) => {
        if (error) return res.status(400).json({ message: error });
        if (cart) {
          res.status(201).json({ cart });
        }
      });
    }
  });
};
