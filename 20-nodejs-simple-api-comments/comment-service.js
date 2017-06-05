'use strict';

const fs = require('fs');

module.exports = class CommentService {
  constructor(filename) {
    this.filename = filename;
  }

  findAll(callback) {

    debugger
    fs.readFile(this.filename, function (err, data) {
      if (err) {
        callback(err);
      }
      callback(null, JSON.parse(data));
    });
  }

  add(newComment, callback) {
    fs.readFile(this.filename, (err, data) => {
      if (err) {
        callback(err);
      }
      newComment.id = Date.now();
      var comments = JSON.parse(data);
      comments.push(newComment);
      fs.writeFile(this.filename, JSON.stringify(comments, null, 4), function (err) {
        if (err) {
          throw err;
        }
        callback(null, comments, newComment);
      });
    });
  }

  delete(commentId, callback) {
    fs.readFile(this.filename, (err, data) => {
      if (err) {
        callback(err);
      }
      let comments = JSON.parse(data);
      let deleted;
      comments = comments.filter((comment, index) => {
        if (comment.id == commentId) {
          deleted = comment;
          return false;
        } else {
          return true;
        }
      });

      if (!deleted) {
        callback(new Error(`Comment with id=${commentId} does not exist.`), comments);
      } else {
        fs.writeFile(this.filename, JSON.stringify(comments, null, 4), function (err) {
          if (err) {
            callback(err);
          }
          callback(null, comments, deleted);
        });
      }
    });
  }
  
}

