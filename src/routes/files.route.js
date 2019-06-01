const express = require('express');
const router = express.Router();

const fileController = require('../controllers/files.controller');


router.get('/resume/:fileName',fileController.getResume);


















module.exports = router;