const express = require('express');
const { logs } = require('../controller/functionality.controller');
const { protect } = require('../config/protect');
const router = express.Router();

router.get('/logs',protect,logs);

module.exports= router ;
