/*
 * @Descripttion: 
 * @version: 1.0
 * @Author: maoyueer
 * @Date: 2022-12-09 16:21:25
 * @LastEditors: maoyueer
 * @LastEditTime: 2023-01-16 17:57:53
 */
var express = require('express');
var router = express.Router();
const user_controller = require('../controllers/userController');
// 用户注册
router.post('/register', user_controller.register_user)
//用户登录
router.post('/login', user_controller.login_user)
// 用户退出登录
router.post('/logout', user_controller.logout_user)
// 获取用户信息
router.get('/user/info', user_controller.user_info)
/* GET home page. */
// router.get('/', function(req, res, next) {
//   res.render('index', { title: 'Express' });
// });
// GET 请求主页
// router.get('/', (req, res) => {
//   res.redirect('/catalog');
// });


module.exports = router;
