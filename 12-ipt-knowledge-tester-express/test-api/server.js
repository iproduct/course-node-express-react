/**
 * This file provided by IPT-Intellectual Products & Technologies (IPT)
 * is for non-commercial testing and evaluation purposes only. 
 * IPT reserves all rights not expressly granted.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL
 * FACEBOOK BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN
 * ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
 * WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */

'use strict';

const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');

const rootPath = path.normalize(path.join(__dirname, '..'));

// const fs = require('fs');
// const path = require('path');
// const Hapi = require('hapi');
// const Good = require('good');
// const Boom = require('boom');


// const assert = require('assert');

const testRoutes = require('./routes/test.routes');
// const userRoutes = require('./user.routes');
// const allRoutes = testRoutes.concat(userRoutes);


const app = express();

// view engine setup
app.set('app', path.join(rootPath, 'app'));
// app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
// app.use(express.static(path.join(rootPath, 'app/assets')));

app.use('/api/tests', testRoutes);
// app.get('/api/tests', function (req, res) {
//   res.send('Hello World!')
// })

/// catch 404 and forwarding to error handler
app.use(function (req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

/// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
} else {
  // production error handler
  // no stacktraces leaked to user
  app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: {}
    });
  });
}


const MongoClient = require('mongodb').MongoClient;

//Connection URL to db
const url = 'mongodb://localhost:27017/tests';

//Use connect to connect to db
MongoClient.connect(url, { db: { w: 1 } }).then((db) => {
  // assert.equal(null, err);
  console.log(`Successfully connected to MongoDB server at: ${url}`);

  //Add db as app local property
  app.locals.db = db;

  // // Registering the Good plugin
  // server.register([{
  //   register: Good,
  //   options: {
  //     reporters: {
  //       console: [{
  //         module: 'good-squeeze',
  //         name: 'Squeeze',
  //         args: [{
  //           error: '*',
  //           log: '*'
  //         }]
  //       }, {
  //         module: 'good-console'
  //       }, 'stdout']
  //     }
  //   }
  // }], (err) => {
  //   if (err) {
  //     throw err;
  //   }

  // Starting the server



  app.listen(9000, (err) => {
    if (err) {
      throw err;
    }
    console.log('Example app listening on port 3000!')
  })


  //   server.start((err) => {
  //     if (err) {
  //       throw err;
  //     }
  //     console.log('Server running at:', server.info.uri);
  //   });
  // });

  // // Registering roots
  // server.route(allRoutes);
}).catch((err) => { throw err; });
