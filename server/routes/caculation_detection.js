/*
 * @Descripttion: 
 * @version: 
 * @Author: maoyueer
 * @Date: 2023-01-03 13:44:07
 * @LastEditors: maoyueer
 * @LastEditTime: 2023-01-04 15:10:14
 */
var express = require('express');
var router = express.Router();
var request = require('request');
const caculation_controller = require('../controllers/caculationController');
router.post('/caculation/normal', caculation_controller.caculation_normal)
router.post('/caculation/fire', caculation_controller.caculation_fire)
router.post('/caculation/small', caculation_controller.caculation_small)
router.post('/caculation/gesture', caculation_controller.caculation_gesture)

module.exports = router;