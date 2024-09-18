const express = require('express');
const router = express.Router();
const Class = require('../models/class'); 
const classController = require("../controllers/class.js");


router.get("/create", classController.renderCreate);

router.post("/create", classController.createSuccess);

router.get('/:id', classController.showClass);

module.exports = router;
