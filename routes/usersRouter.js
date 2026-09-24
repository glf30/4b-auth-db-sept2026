const express = require("express");
const { createUser, login, getUsers } = require("./usersController");

const router = express.Router();

router.get("/", getUsers)
router.post("/", createUser);
router.post("/login", login);

module.exports = router