const express = require("express");
const router = express.Router();

const User = require("../models/user.model");

router.post("/create-account", (req, res) => {
  const body = req.body;
  const newUser = new User(body);
  newUser
    .save()
    .then((user) => {
      res.status(201).json(user);
    })
    .catch((e) => res.status(405).json(e));
});
router.post("/login", (req, res) => {
  User.findOne({
    username: req.body.username,
    password: req.body.password,
  })
    .then((user) => {
      res.status(201).json(user);
    })
    .catch((e) => res.status(405).json(e));
});

module.exports = router;
