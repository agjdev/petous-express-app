var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var hbs = require('express-handlebars');
const mongoose = require('mongoose');
var db = require('./config/connection');
var session = require('express-session');
var MongoStore = require('connect-mongo');



var mainRouter = require('./routes/pet');
var userRouter = require('./routes/user');
var vetRouter = require('./routes/vet');
var authRouter = require('./routes/auth');
var adminRouter = require('./routes/admin');

var app = express();



// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
app.engine('hbs', hbs.engine({extname:'hbs',defaultLayout:'layouts',layoutsDir:__dirname+'/views/layouts/',partialsDir:__dirname+'/views/partials/'}));
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


app.use(session({
  secret: 'your_secret_key',
  resave: false,
  saveUninitialized: false,
   unset: 'destroy',
   store:MongoStore.create({
    mongoUrl:'mongodb://localhost:27017/petous'


   }),
  cookie: {
    maxAge: 10 * 60 * 1000
  },
}));



function isAuth(req, res, next) {
  if (!req.session.user) {
    res.redirect('/auth/login');
  } else {
    next();
  }
}

app.use(function (req,res,next){
  res.locals.login = req.isAuth;
  res.locals.session = req.session;
  next();
})

app.use('/', mainRouter);
app.use('/u', userRouter);
app.use('/v', vetRouter);
app.use('/auth', authRouter);
app.use('/admin', adminRouter);

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
