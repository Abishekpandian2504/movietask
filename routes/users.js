// const { User, validate } = require("../models/user");
// const mongoose = require('mongoose');
// const express = require("express");
// const router = express.Router();
// router.post("/", async (req, res) => {
//  const { error } = validate(req.body);
//  if (error) return res.status(400).send(error.details[0].message);
//  let user = await
// User.findOne({ email:req.body.email });
//  if (user) return res.status(400).send("User already registered.");
//  user = new User({
//  name: req.body.name,
//  email: req.body.email,
//  password: req.body.password
//  });
//  await user.save();
//  res.send(user);
// });
// module.exports = router;

//2nd using lodash(it is used to display )
// const { User, validate } = require("../models/user");
// const mongoose = require('mongoose');
// const express = require("express");
// const router = express.Router();
// const _ = require("lodash");
// const bcrypt = require("bcrypt");

// router.post("/", async (req, res) => {
//  const { error } = validate(req.body);
//  if (error) return res.status(400).send(error.details[0].message);
//  let user = await
// User.findOne({ email:req.body.email });
//  if (user) return res.status(400).send("User already registered.");
// //  user = new User({
// //  name: req.body.name,
// //  email: req.body.email,
// //  password: req.body.password
// //  });
// user = new User(_.pick(req.body,  ["name", "email", "passwrod"]));
//  await user.save();
// //  res.send(user);
// // res.send({
// //     name: user.name,
// //     email: user.email
// //     });
// res.send(_.pick(user, ["_id", "name", "email"]));
// });
// module.exports = router;


//3rd (bcrypt) use password as hash and salt
const { User, validate } = require("../models/user");
const mongoose = require('mongoose');
const express = require("express");
const router = express.Router();
const _ = require("lodash");
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');
const config = require('config');
const auth = require("../middleware/auth");

router.get("/me", auth, async (req, res) => {
  const user = await User.find().select("-password");
  res.send(user);
});

router.post("/", async (req, res) => {
 const { error } = validate(req.body);
 if (error) return res.status(400).send(error.details[0].message);
 let user = await
User.findOne({ email:req.body.email });
 if (user) return res.status(400).send("User already registered.");
//  user = new User({
//  name: req.body.name,
//  email: req.body.email,
//  password: req.body.password
//  });
user = new User(_.pick(req.body,  ["name", "email", "password"]));
     const salt = await bcrypt.genSalt(10);
     user.password = await bcrypt.hash(user.password, salt);

     await user.save();
// //  res.send(user);
// // res.send({
// //     name: user.name,
// //     email: user.email
// //     });
// res.send(_.pick(user, ["_id", "name", "email"]));
// console.log(user)

// const token = jwt.sign({ _id: user._id}, config.get('jwtPrivateKey'));
// res
// .header("x-auth-token",token)
// .send(_.pick(user, ["_id", "name", "email"]));
// console.log(user)

const token = user.generateAuthToken();
  res
    .header("x-auth-token", token)
    .send(_.pick(user, ["_id", "name", "email"]));



});
module.exports = router;