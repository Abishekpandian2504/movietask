
const jwt = require('jsonwebtoken');
const config = require('config');
const mongoose = require('mongoose');
const Joi = require('joi');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: 3,
    maxlength: 50,
    required: true,
    trim: true
  },
  email: {
    type: String,
    minlength: 10,
    maxlength: 255,
    required: true,
    lowercase: true,
    unique: true
  },
  password: {
    type: String,
    minlength: 6,
    maxlength: 1024
  },
  isAdmin: Boolean
});
// userSchema.methods.generateAuthToken = function() {
//   const token = jwt.sign(
//     { _id: this._id},
//     config.get('jwtPrivateKey')
//   );
//   return token;

  // return jwt.sign(
  //   { _id: this._id, isAdmin: this.isAdmin },
  //   config.get('jwtPrivateKey')
  // );
  userSchema.methods.generateAuthToken = function() {
 const token = jwt.sign({ _id: this._id, isAdmin:this.isAdmin }, config.get('jwtPrivateKey') );
 return token;
 // return jwt.sign(
 // { _id: this._id, isAdmin: this.isAdmin },
 // config.get('jwtPrivateKey')
 // );
 
};



const User = mongoose.model('User', userSchema);

function validateUser(value) {
  const schema = {
    name: Joi.string()
      .min(3)
      .max(50)
      .required(),
    email: Joi.string()
      .min(10)
      .max(255)
      .email()
      .required(),
    password: Joi.string().required()
  };
  return Joi.validate(value, schema);
}

exports.User = User;
exports.validate = validateUser;

