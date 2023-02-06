/*
 * @Descripttion: 
 * @version: 藏书文体类型模型
 * @Author: maoyueer
 * @Date: 2022-12-12 14:50:29
 * @LastEditors: maoyueer
 * @LastEditTime: 2022-12-12 15:28:37
 */
const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const GenreInstanceSchema = new Schema({
  // 指向相关藏书的引用
  // book: { type: Schema.Types.ObjectId, ref: 'Book', required: true },
  // 出版项
  name: { type: String, required: true, max: 100, min: 3 },
  // status: {
  //   type: String,
  //   required: true,
  //   enum: ['Available', 'Maintenance', 'Loaned', 'Reserved'],
  //   default: 'Maintenance'
  // },
  // due_back: { type: Date, default: Date.now }
}
);

// 虚拟属性'url'：藏书体裁 URL
GenreInstanceSchema
  .virtual('url')
  .get(function () {
    return '/catalog/genre/' + this._id;
  });

// 导出 GenreInstance 模型
module.exports = mongoose.model('GenreInstance', GenreInstanceSchema);