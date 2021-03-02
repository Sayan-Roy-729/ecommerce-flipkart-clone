const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const Schema = mongoose.Schema;

const schema = Schema(
  {
    firstName: {
      type: String,
      required: true,
      trim: true,
      min: 3,
      max: 120,
    },
    lastName: {
      type: String,
      required: true,
      trim: true,
      min: 1,
      max: 120,
    },
    userName: {
      type: String,
      required: true,
      trim: true,
      unique: true,
      index: true,
      lowercase: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      unique: true,
      lowercase: true,
    },
    hash_password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ['user', 'admin'],
      default: 'user',
    },
    contactNumber: {
      type: String,
    },
    profilePicture: {
      type: String,
    },
  },
  { timestamps: true }
);

// schema.virtual('password').set(function(password) {
//   this.hash_password = bcrypt.hashSync(password, 14);
// });

// schema.methods = {
//   authenticate: function(password){
//     return bcrypt.compareSync(password, this.hash_password);
//   }
// }

// schema.virtual('fullName').get(function(){
//   return `${this.fullName} ${this.lastName}`;
// });

schema.methods.authenticate = async (password, hash_password) => {
  // return bcrypt.compareSync(password, hash_password);
  return await bcrypt.compare(password, hash_password);
};

schema.methods.fullName = function(firstName, lastName){
  return `${firstName} ${lastName}`;
};

module.exports = mongoose.model('User', schema);
