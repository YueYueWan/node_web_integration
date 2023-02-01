/*
 * @Descripttion: 入口文件
 * @version: 
 * @Author: maoyueer
 * @Date: 2022-12-09 16:21:25
 * @LastEditors: maoyueer
 * @LastEditTime: 2023-02-01 10:19:46
 */
const history = require('connect-history-api-fallback');
const webpackDevMiddleware = require("webpack-dev-middleware")
const webpack = require("webpack")
const bcrypt = require('bcrypt')
const dtime = require('time-formater');
var express = require('express');
var createError = require('http-errors');//处理错误中间件。
const webpackConfig = require('../node_web_integration/webpack.config.dev.js')
var path = require('path');
var cookieParser = require('cookie-parser');//用于解析 cookie 头来填充 req.cookies（提供了访问 cookie 信息的便捷方法)
var logger = require('morgan');//node 专用 HTTP 请求记录器中间件
var async = require('async') //引入async
var app = express();
DIST_DIR = path.join(__dirname, "../dist"),// 设置静态访问文件路径
complier = webpack(webpackConfig) 
app.use(webpackDevMiddleware(complier, {
  publicPath: webpackConfig.output.publicPath,
}))
// app.use(history());
// app.use('/', history());
// app.use(express.static(__dirname+'../dist/',{index : "index.html"}));
// app.use(express.static(path.join(__dirname, '../dist')));
// app请求
var bodyParser = require('body-parser');
app.use( bodyParser.json({limit: "10mb", type:'application/json'}) );      
app.use(bodyParser.urlencoded({
  limit: "10mb",
  extended: true,
  parameterLimit:10,
  type:'application/json'
})); 

app.use(logger('dev'));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.all('*', (req, res, next) => {
  const { origin, Origin, referer, Referer } = req.headers;
  const allowOrigin = origin || Origin || referer || Referer || '*';
  res.header("Access-Control-Allow-Origin", '*');
  res.header("Access-Control-Allow-Headers", "Content-Type,Access-Token,Appid,Secret, Authorization, X-Requested-With");
  res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
  res.header("Access-Control-Allow-Credentials", true); //可以带cookies
  res.header("X-Powered-By", 'Express');
  if (req.method == 'OPTIONS') {
    res.sendStatus(200);
  } else {
    next();
  }
});

// import routes
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
const catalogRouter = require('./routes/catalog');
var calculationRouter = require('./routes/caculation_detection');
console.log('calculationRouter====',calculationRouter)

// 使用swagger API 文档
var swaggerInstall = require('./utils/swagger')
swaggerInstall(app)
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');



app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/catalog', catalogRouter);
app.use('/',calculationRouter);
var userModel = require('./models/user')
// Set up mongoose connection
var mongoose = require('mongoose');
var dev_db_url = 'mongodb://root:fhznmongo@47.110.63.208:8081/algorithmicUser?authSource=admin';
// var dev_db_url = 'mongodb://localhost:27017/algorithmic_database';
mongoose.set('strictQuery', true);
mongoose.connect(dev_db_url, { useNewUrlParser: true }, (err, res) => {
  if (!err) {
    console.log('success', res)
  } else {
    console.log('error', err)
  }
})
mongoose.Promise = global.Promise;
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});
var users = [];
function userCreate(username, password, status, create_time, admin, introduction, cb) {
  const hashPwd = bcrypt.hashSync(password, 10) // 使用bcrypt.hashSync方法生成密文密码
  userdetail = {
    username,
    password: hashPwd,
    id: 123,
    create_time: dtime().format('YYYY-MM-DD HH:mm'),
    admin: 1,
    roles: ['admin'],
    status,
    introduction: introduction
  }
  // if (genre != false) bookdetail.genre = genre

  var user = new userModel(userdetail);
  user.save(function (err) {
    if (err) {
      cb(err, null)
      return
    }
    console.log('New Book: ' + user);
    users.push(user)
    cb(null, user)
  });
}
function createUsers(cb) {
  async.parallel([
    function (callback) {
      userCreate('admin', '123456', '1', '2022/12/15', 1, 'I am a super administrator', callback);
    },
  ],
    // optional callback
    cb);
}
// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});
async.series([
  createUsers,
],
  // Optional callback
  function (err, results) {
    if (err) {
      console.log('FINAL ERR: ' + err);
    }
    else {
      // console.log('BOOKInstances: ' + bookinstances);

    }
    // All done, disconnect from database
    // mongoose.connection.close();
  });
module.exports = app;
