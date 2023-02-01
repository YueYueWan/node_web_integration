/*
 * @Descripttion: 
 * @version: 
 * @Author: maoyueer
 * @Date: 2023-01-04 10:15:12
 * @LastEditors: maoyueer
 * @LastEditTime: 2023-01-11 14:05:42
 */
var request = require('request');
const url = "http://10.0.40.71:5001"
// 通用目标检测
exports.caculation_normal = (req, res, next) => {
  const { image, returnMode } = req.body;
  if (!image || !returnMode) {
    res.send({
      code: -1,
      msg: '参数error',
      data: null
    })
    return;
  }
  request({
    url: url + '/image-detect/insulator',
    method: "POST",
    json: true,
    headers: {
      "content-type": "application/json",
    },
    body: req.body
  }, function (error, response, body) {
    console.log('/image-detect/insulator/response=======', response)
    if (!error && response.statusCode == 200) {
      console.log(body)
      console.log(response) // 请求成功的处理逻辑
      res.send({
        code: 0,
        msg: '图片检测成功',
        data: response.body.data
      })
    } else {
      res.send({
        code: -1,
        msg: '接口繁忙',
        data: response
      })
    }
  });
}
// 火点目标检测
exports.caculation_fire = (req, res, next) => {
  const { image, returnMode } = req.body;
  if (!image || !returnMode) {
    res.send({
      code: -1,
      msg: '参数error',
      data: null
    })
    return;
  }
  request({
    url: url + '/image-detect/fire-detect',
    method: "POST",
    json: true,
    headers: {
      "content-type": "application/json",
    },
    body: req.body
  }, function (error, response, body) {
    // console.log('/image-detect/common/response=======', response)
    if (!error && response.statusCode == 200) {
      console.log(body)
      console.log(response) // 请求成功的处理逻辑
      res.send({
        code: 0,
        msg: '图片检测成功',
        data: response.body.data
      })
    }else {
      res.send({
        code: -1,
        msg: '接口繁忙',
        data: response
      })
    }
  });
}
// 小目标检测
exports.caculation_small = (req, res, next) => {
  const { image, returnMode } = req.body;
  if (!image || !returnMode) {
    res.send({
      code: -1,
      msg: '参数error',
      data: null
    })
    return;
  }
  request({
    url: url + '/image-detect/tiny-obj-detect',
    method: "POST",
    json: true,
    headers: {
      "content-type": "application/json",
    },
    body: req.body
  }, function (error, response, body) {
    // console.log('/image-detect/common/response=======', response)
    if (!error && response.statusCode == 200) {
      console.log(body)
      console.log(response) // 请求成功的处理逻辑
      res.send({
        code: 0,
        msg: '图片检测成功',
        data: response.body.data
      })
    }else {
      res.send({
        code: -1,
        msg: '接口繁忙',
        data: response
      })
    }
  });
}
// 姿势检测
exports.caculation_gesture = (req, res, next) => {
  const { image, returnMode } = req.body;
  if (!image || !returnMode) {
    res.send({
      code: -1,
      msg: '参数error',
      data: null
    })
    return;
  }
  request({
    url: url + '/image-detect/pose-detect',
    method: "POST",
    json: true,
    headers: {
      "content-type": "application/json",
    },
    body: req.body
  }, function (error, response, body) {
    // console.log('/image-detect/common/response=======', response)
    if (!error && response.statusCode == 200) {
      console.log(body)
      console.log(response) // 请求成功的处理逻辑
      res.send({
        code: 0,
        msg: '图片检测成功',
        data: response.body.data
      })
    }else {
      res.send({
        code: -1,
        msg: '接口繁忙',
        data: response
      })
    }
  });
}