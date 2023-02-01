/*
 * @Descripttion: connect mongoDB
 * @version: 
 * @Author: maoyueer
 * @Date: 2022-12-09 17:27:52
 * @LastEditors: maoyueer
 * @LastEditTime: 2022-12-13 14:53:06
 */
import chalk from 'chalk';
// 导入 mongoose 模块
const mongoose = require('mongoose');
// 服务器数据库
var dev_db_url = 'mongodb://root:fhznmongo@47.110.63.208:8081/algorithmicUser?authSource=admin';
//本地数据库
// var dev_db_url = 'mongodb://localhost:27017/algorithmic_database';
mongoose.set('strictQuery', true);
mongoose.connect(dev_db_url, { useNewUrlParser: true }, (err, res) => {
  if (!err) {
    chalk.green('success', res)
  } else {
    chalk.red('error', err)
  }
})
mongoose.Promise = global.Promise;
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
export default db;
