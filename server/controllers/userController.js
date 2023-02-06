/*
 * @Descripttion: 
 * @version: 
 * @Author: maoyueer
 * @Date: 2022-12-14 11:04:58
 * @LastEditors: maoyueer
 * @LastEditTime: 2022-12-19 14:12:08
 */
const bcrypt = require('bcrypt')
const userModel = require('../models/user');
const { jwtSign } = require('../utils/jwt')
const dtime = require('time-formater');


//用户注册
exports.register_user = (req, res) => {
  console.log(req, 'AAAAAAAAAAAAAAAAAA')
  const { username, password } = req.body
  console.log('username==', username, "password===", password)
  const status = 1
  if (username && password) {
    const hashPwd = bcrypt.hashSync(password, 10) // 使用bcrypt.hashSync方法生成密文密码
    const user = userModel.findOne({ username })
    console.log(user, 'ppppp')
    if (user) {
      console.log('该用户已经存在');
      res.send({
        code: '-1',
        msg: '该用户已经存在',
      })
    } else {
      // 是否是管理员，暂时默认都是管理员
      var admin = 1
      userModel.create({
        username, password: hashPwd,
        id: 123,
        create_time: dtime().format('YYYY-MM-DD HH:mm'),
        admin: 1,
        roles: [admin === 1 ? 'admin' : 'editor'],
        status,
        introduction: admin === 1 ? 'I am a super administrator' : 'Normal Editor'

      }, (err, data) => {
        if (err) {
          res.send({
            code: '1',
            msg: '注册失败'
          })
        } else {
          res.send({
            code: '0',
            msg: '注册成功'
          })
        }
      })
    }
  } else {
    res.send({
      code: '-1',
      msg: '参数错误'
    })
  }
};
// 用户登录
exports.login_user = (req, res) => {
  const { username, password } = req.body
  if (username && password) {
    userModel.find({ username }, (err, data) => {
      if (err || !data.length) {
        res.send({
          code: '1',
          msg: '登录失败'
        })
      } else {
        const isPwdValid = bcrypt.compareSync(password, data[0].password) // 使用bcrypt.compareSync方法验证密码
        if (isPwdValid) {
          var dataJson = data[0];
          const { username, status, admin, avatar, roles, introduction } = dataJson;
          console.log('data====', data)
          const token = jwtSign({ _id: data[0]._id }) // 用引入的jwtSign方法生成token并返回
          res.send({
            code: '0',
            msg: '登录成功',
            data: {
              token,
              userInformation: { name: username, admin, status, roles, introduction, avatar }
            }
          })
        } else {
          res.send({
            code: '2',
            msg: '密码错误'
          })
        }
      }
    })
  } else {
    res.send({
      code: '-1',
      msg: '参数错误'
    })
  }
}
// 获取用户信息
exports.user_info = (req, res) => {
  const { username } = req.body
  if (username) {
    userModel.find({ username }, (err, data) => {
      if (err || !data.length) {
        res.send({
          code: '1',
          msg: '获取用户信息失败'
        })
      } else {
        const isPwdValid = bcrypt.compareSync(password, data[0].password) // 使用bcrypt.compareSync方法验证密码
        if (isPwdValid) {
          var dataJson = data[0];
          const { username, status, admin, avatar, roles, introduction } = dataJson;
          console.log('data====', data)
          res.send({
            code: '0',
            msg: '获取用户信息成功',
            data: {
              userInformation: { name: username, admin, status, roles, introduction, avatar }
            }
          })
        } else {
          res.send({
            code: '2',
            msg: '该用户不存在'
          })
        }
      }
    })
  } else {
    res.send({
      code: '-1',
      msg: '参数错误'
    })
  }
}
// 用户退出登录
exports.logout_user = (req, res) => {
  res.send({
    code: '0',
    msg: '退出成功'
  })
  // try{
  //   res.send({
  //     code: '0',
  //     msg: '退出成功'
  //   })
  // }catch(err){
  //   console.log('退出失败', err)
  //   res.send({
  //     code: '-1',
  //     msg: '退出失败'
  //   })
  // }
  
}