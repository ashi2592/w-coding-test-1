var express = require('express');
var router = express.Router();
var {transfromData} = require('../controller/index');
/* GET home page. */
router.post('/transfrom',transfromData);

module.exports = router;
