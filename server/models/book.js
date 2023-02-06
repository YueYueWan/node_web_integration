/*
 * @Descripttion: 
 * @version: 藏书模型
 * @Author: maoyueer
 * @Date: 2022-12-12 14:48:13
 * @LastEditors: maoyueer
 * @LastEditTime: 2022-12-12 15:02:58
 */
const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const BookSchema = new Schema({
  title: {type: String, required: true},
  author: {type: Schema.Types.ObjectId, ref: 'Author', required: true},
  summary: {type: String, required: true},
  isbn: {type: String, required: true},
  genre: [{type: Schema.Types.ObjectId, ref: 'Genre'}]
});

// 虚拟属性'url'：藏书 URL
BookSchema
  .virtual('url')
  .get(function () {
    return '/catalog/book/' + this._id;
  });

// 导出 Book 模块
module.exports = mongoose.model('Book', BookSchema);
