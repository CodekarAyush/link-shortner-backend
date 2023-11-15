const express = require('express');
const { logs, deleteLogs } = require('../controller/functionality.controller');
const { protect } = require('../config/protect');
const router = express.Router();

router.get('/logs',protect,logs);
router.delete('/logs/:userId',protect,deleteLogs );
module.exports= router ;
