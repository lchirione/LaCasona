const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const methodOverride = require('method-override');
const hbs = require('hbs');
const http = require('http');

const host = '127.0.0.1';


const indexRouter = require('./routes/index.routes');
const mozoRouter = require('./routes/mozo.routes');
const cocinaRouter = require('./routes/cocina.routes');
const pedidoRouter = require('./routes/pedido.routes');


// Initialitation 
const app = express();
require('./database')

// Setings
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(methodOverride('_method'));

hbs.registerHelper('ternaryEqual', function(val_1, val_2, val_true, val_false){
  return val_1 == val_2 ? val_true : val_false;
});

// Routes
app.use('/', indexRouter);
app.use('/mozo', mozoRouter);
app.use('/cocina', cocinaRouter);
app.use('/pedido', pedidoRouter);
app.use('/pruebacliente', pruebaRouter);

// Format ARS
const formatARS = require('./public/javascripts/format-ars');
hbs.registerHelper('formatARS', formatARS);

// Static File
app.use(express.static(path.join(__dirname, 'public')));

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
