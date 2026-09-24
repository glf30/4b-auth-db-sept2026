const express = require("express");
const { createUser, login } = require("./usersController");

const router = express.Router();

router.post("/", createUser);
router.post("/login", login);

module.exports = router