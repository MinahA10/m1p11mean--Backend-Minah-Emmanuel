var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

const { engine } = require('express-handlebars');
const cors = require('cors');

const { connectDB } = require('./services/mongoose')
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var authClientRoute = require('./routes/authClient');

var app = express();

// view engine setup
app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views',path.join(__dirname, 'views'))

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors());

connectDB().catch(err => console.log(err));

app.options('/auth/login', cors());

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/auth',authClientRoute)

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
