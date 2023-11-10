const express = require('express');
const { handleUrl } = require('../controller/url.controller');
const router = express.Router();

router.post('/shorten',handleUrl );

module.exports= router;
