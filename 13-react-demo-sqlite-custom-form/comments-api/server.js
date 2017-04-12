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

var sqlite3 = require('sqlite3').verbose();
const express = require('express');
const path = require('path');
// const favicon = require('serve-favicon');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');

const rootPath = path.normalize(path.join(__dirname, '..'));
const routes = require('./routes');
// const fs = require('fs');

const app = express();
app.set('app', path.join(rootPath, 'app'));

// uncomment after placing your favicon in /public
//app.use(favicon(dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
// app.use(express.static(path.join(rootPath, 'app/assets')));

app.use('/api/comments', routes);
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

// Initialize DB
const DB_FILE = path.join(__dirname, 'comments.sqlite');
const TABLE_NAME = 'comments';
const db = new sqlite3.Database(DB_FILE, (err) => {
  if (err) throw err;

  //Test if comments table exists - if not create it
  let result = db.get(`SELECT name FROM sqlite_master WHERE type='table' AND name=?;`, [TABLE_NAME]);
  console.log(result);
  if (!result) {
    db.run(`CREATE TABLE comments (id INTEGER PRIMARY KEY, author TEXT, text TEXT);`)
      .then(() =>
        console.log(`Table "comments" successfully created in db: ${DB_FILE}`)
      );
  }
  console.log(`Successfully connected to SQLite server`);

  //Add db as app local property
  app.locals.db = db;

  //Start the server
  app.listen(9000, (err) => {
    if (err) throw err;
    console.log('Example app listening on port 3000!')
  });
});




