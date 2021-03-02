const path = require('path');
const express = require('express');
const env = require('dotenv');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');

// Import Routes
const userRoutes = require('./routes/auth');
const adminRoutes = require('./routes/admin/auth');
const categoryRoutes = require('./routes/category');
const productRoutes = require('./routes/product');
const cartRoutes = require('./routes/cart');
const initialDataRoutes = require('./routes/admin/initialData');

const app = express();

// environment variables
env.config();

// Parse the incomming post request json data
app.use(bodyParser.json());

app.use('/public', express.static(path.join(__dirname, 'uploads')));

// Resolve CORS Promblems
app.use(cors());

// Use the routers
app.use('/api/v1', userRoutes);
app.use('/api/v1/admin', adminRoutes);
app.use('/api/v1/category', categoryRoutes);
app.use('/api/v1/product', productRoutes);
app.use('/api/v1/user/cart', cartRoutes);
app.use('/api/v1', initialDataRoutes);


// error middleware
app.use((error, req, res, next) => {
  console.log(error);
  const status = error.statusCode || 500;
  const message = error.message;
  const data = error.data;
  res.status(status).json({
    message: message,
    data: data
  })
}); 

// connect with mongodb & start server
mongoose
  .connect(process.env.MONGODB_CONNECTION_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
  })
  .then(() => {
    console.log('Mongodb connected');
    return app.listen(8080);
  })
  .then(() => {
    console.log(`Server is running on port ${process.env.PORT}`);
  })
  .catch((err) => {
    console.log(err);
  });



// Create ShortID for multer filename --> npm install --save shortid
// npm install cors --save