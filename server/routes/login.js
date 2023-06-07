const bcrypt = require("bcrypt");
const Joi = require("joi");
const express = require("express");
const { User } = require("../models/user");
const genAuthToken = require("../utils/genAuthToken");

const router = express.Router() // api endpoint

router.post("/", async (req, res) => {
  // vlaidate the data
  const schema = Joi.object({
    email: Joi.string().min(3).max(200).required().email(),
    password: Joi.string().min(6).max(200).required(),
  });

  // throw message error
  const { error } = schema.validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  // check if the email exist
  let user = await User.findOne({ email: req.body.email })
  if (!user) return res.status(400).send("Invalid email or password");

  // check the if the password is valid
  const isValid = await bcrypt.compare(req.body.password, user.password)
  if (!isValid) return res.status(400).send("Invalid email or password");

  // generate the token
  const token = genAuthToken(user)
  res.send(token);

});

module.exports = router;