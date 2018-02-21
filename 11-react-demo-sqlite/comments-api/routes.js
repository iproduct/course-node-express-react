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
const router = express.Router();
const error = require('./helpers').sendErrorResponse;
const util = require('util');
const indicative = require('indicative');


// GET comments list (optionally by author)
router.get('/', function (req, res) {
  const db = req.app.locals.db;
  let sqlQuery = 'SELECT * FROM comments';
  const qParams = [];

  if (req.query.author) {
    sqlQuery += ' WHERE author = ?';
    qParams.push(req.params.author);
  }

  db.all(sqlQuery, qParams, function (err, results) {
    if (err) throw err;
    console.log(results);
    res.json(results);
  });
});

// GET single comment by id
router.get('/:commentId', (req, res) => {
  const db = req.app.locals.db;
  const params = indicative.sanitize(req.params, { commentId: 'to_int' });

  indicative.validate(params, { commentId: 'required|integer|above:0' })
    .then(() => {
      db.get('SELECT * FROM comments WHERE id = ?', [params.commentId], function (err, result) {
        if (err) throw err;
        if (typeof result !== 'undefined') {
          res.json(result);
        }
        else {
          error(req, res, 404, { errors: [`Comment with Id=${params.commentId} not found.`] });
        }
      });
    }).catch(errors => {
      error(req, res, 400, 'Invalid comment ID: ' + util.inspect(errors))
    });
});

// Create new comment
router.post('/', function (req, res) {
  const db = req.app.locals.db;
  let comment = req.body;
  indicative.validate(req.body, {
    id: 'integer|above:0',
    author: 'required|string|min:2',
    text: 'required|string'
  }).then(() => {
    db.run(`INSERT INTO comments (author, text) VALUES (?, ?);`, [comment.author, comment.text], function (err) {
      if (err) {
        console.error(err);
        error(req, res, 500, `Error creating new comment: ${comment}`);
      }
      comment.id = this.lastID;
      const uri = req.baseUrl + '/' + comment.id;
      console.log('Created: ', uri);
      res.location(uri).json(comment);
    });
  }).catch(errors => {
    error(req, res, 400, `Invalid comment data for '${comment}': ${util.inspect(errors)}`);
  });
});

// Delete comment by id
router.delete('/:commentId', function (req, res) {
  const db = req.app.locals.db;
  const params = indicative.sanitize(req.params, { commentId: 'to_int' });

  indicative.validate(params, { commentId: 'required|integer|above:0' })
    .then(() => {
      db.run('DELETE FROM comments WHERE id = ?', [params.commentId], function (err) {
        if (err) {
          console.error(err);
          error(req, res, 500, `Error deleting comment with Id: ${params.commentId}`);
        }
        if (this.changes > 0) {
          console.log('Deleted: ', req.baseUrl);
          res.json({ message: `Comment ${params.commentId} was deleted successfully.` });
        } else {
          error(req, res, `Comment with Id=${params.commentId} not found.`);
        }
      });
    }).catch(errors => {
      error(req, res, 400, 'Invalid comment ID: ' + util.inspect(errors))
    });
});

module.exports = router;
