const express = require("express");
const router = express.Router({mergeParams: true});
const userController = require("../controllers/user.js")

router.get("/signup", userController.registerUser);