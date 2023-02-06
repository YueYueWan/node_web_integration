/*
 * @Descripttion: 
 * @version: 
 * @Author: maoyueer
 * @Date: 2022-12-14 11:36:10
 * @LastEditors: maoyueer
 * @LastEditTime: 2022-12-16 15:48:19
 */
const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
	username: String,
	password: String,
	create_time: String,
	roles: { type: Array, default: ['admin'] },
	admin: { type: String, default: '管理员' },
	status: Number,  //1:普通管理、 2:超级管理员
	avatar: { type: String, default: 'default.jpg' },
	introduction: { type: String, default: 'I am a super administrator' },
})

userSchema.index({ id: 1 });

const userModel = mongoose.model('userData', userSchema);


module.exports = userModel