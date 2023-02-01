/*
 * @Descripttion: 
 * @version: 
 * @Author: maoyueer
 * @Date: 2022-12-09 16:21:25
 * @LastEditors: maoyueer
 * @LastEditTime: 2022-12-09 16:51:14
 */
var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});
router.get('/cool', function(req, res, next) {
  res.send('you are cool');
});

module.exports = router;
