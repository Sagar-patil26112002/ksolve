const express = require("express");
const router = express.Router(); 
const loginAuthentication = require("../controllers/loginAndSignup.js");

// Register page view route
router.get("/signup", loginAuthentication.renderSignup);

// User registration route
router.post("/signup", loginAuthentication.registerUser);

// Login page view route
router.get("/login", loginAuthentication.renderLogin);

// Login success route
router.post("/login", loginAuthentication.loginSuccess);

module.exports = router;
