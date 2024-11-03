var createError = require('http-errors');
var cookieSession = require('cookie-session')
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var config = require('./config');
var mongoose = require('mongoose')

mongoose.connect(config.db)
  .then(() => console.log('Connected db!'))
  .catch(err => console.log("NOT connect db!"))

var indexRouter = require('./routes/index');
var adminRouter = require('./routes/admin');
var newsRouter = require('./routes/news');
var quizRouter = require('./routes/quiz');
var usersRouter = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// h: wYoXTHkMV60VnRZY
//mongodb+srv://admin:wYoXTHkMV60VnRZY@cluster0.15mpl.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0

app.use(cookieSession({
  name: 'session',
  keys: config.keySession,

  // Cookie Options
  maxAge: config.maxAgeSession
}))


app.use((req, res, next) => {
  res.locals.path = req.path

  next()
})

app.use('/', indexRouter);
app.use('/admin', adminRouter);
app.use('/news', newsRouter);
app.use('/quiz', quizRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
