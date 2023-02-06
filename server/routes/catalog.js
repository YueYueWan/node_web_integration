/*
 * @Descripttion: 
 * @version: 
 * @Author: maoyueer
 * @Date: 2022-12-12 17:29:56
 * @LastEditors: maoyueer
 * @LastEditTime: 2022-12-14 14:23:25
 */
const express = require('express');
const router = express.Router();
// 中间件验证
const {jwtCheck} = require('../utils/jwt')
// 导入控制器模块
const book_controller = require('../controllers/bookController');
const author_controller = require('../controllers/authorController');
const genre_controller = require('../controllers/genreController');
const book_instance_controller = require('../controllers/bookinstanceController');
const user_controller = require('../controllers/userController');

// 用户注册
router.post('/register', user_controller.register_user)
router.post('/login', user_controller.login_user)



// GET 获取藏书编目主页
router.get('/', jwtCheck, book_controller.index);

// GET 请求添加新的藏书。注意此项必须位于显示藏书的路由（使用了 id）之前。
router.get('/book/create', book_controller.book_create_get);

// POST 请求添加新的藏书
router.post('/book/create', book_controller.book_create_post);

// GET 请求删除藏书
router.get('/book/:id/delete', book_controller.book_delete_get);

// POST 请求删除藏书
router.post('/book/:id/delete', book_controller.book_delete_post);

// GET 请求更新藏书
router.get('/book/:id/update', book_controller.book_update_get);

// POST 请求更新藏书
router.post('/book/:id/update', book_controller.book_update_post);

// GET 请求藏书
router.get('/book/:id', book_controller.book_detail);

// GET 请求完整藏书列表
router.get('/books', book_controller.book_list);

/// 藏书副本、藏书种类、作者的路由与藏书路由结构基本一致，只是无需获取主页 ///

module.exports = router;
