'use strict';

const fs = require('fs');

module.exports = class CommentService {
  constructor(filename) {
    this.filename = filename;
  }

  findAll(callback) {
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
    fs.readFile(COMMENTS_FILE, function (err, data) {
      if (err) {
        callback(err);
      }
      let comments = JSON.parse(data);
      let deleted;
      comments = comments.filter((comment, index) => {
        if (comment.id === commentId) {
          deleted = comment;
          return false;
        } else {
          return true;
        }
      });

      if (!deleted) {
        callback(new Error(`Comment with id=${commentId} does not exist.`), comments);
      } else {
        fs.writeFile(COMMENTS_FILE, JSON.stringify(comments, null, 4), function (err) {
          if (err) {
            callback(err);
          }
          callback(null, comments);
        });
      }
    });
  }
  
}



// // Registering roots
// server.route([{
//   method: 'GET',
//   path: '/api/comments',
//   handler: function (request, reply) {
//     fs.readFile(COMMENTS_FILE, function (err, data) {
//       if (err) {
//         throw err;
//       }
//       reply(JSON.parse(data));
//     });
//   }
// },
// {
//   method: 'POST',
//   path: '/api/comments',
//   handler: function (request, reply) {
//     request.t
//     fs.readFile(COMMENTS_FILE, function (err, data) {
//       if (err) {
//         throw err;
//       }
//       var comments = JSON.parse(data);
//       var newComment = {
//         id: Date.now(),
//         author: request.payload.author,
//         text: request.payload.text,
//       };
//       comments.push(newComment);
//       fs.writeFile(COMMENTS_FILE, JSON.stringify(comments, null, 4), function (err) {
//         if (err) {
//           throw err;
//         }
//         reply(comments);
//       });
//     });
//   }
// },
// {
//   method: 'DELETE',
//   path: '/api/comments/{id}',
//   handler: function (request, reply) {
//     fs.readFile(COMMENTS_FILE, function (err, data) {
//       if (err) {
//         throw err;
//       }
//       let comments = JSON.parse(data);
//       let deleted;
//       comments = comments.filter((comment, index) => {
//         if (comment.id === parseInt(request.params.id)) {
//           deleted = comment;
//           return false;
//         } else {
//           return true;
//         }
//       });

//       if (!deleted) {
//         reply(Boom.notFound(`Comment with Id=${request.params.id} does not exist.`));
//       } else {
//         fs.writeFile(COMMENTS_FILE, JSON.stringify(comments, null, 4), function (err) {
//           if (err) {
//             throw err;
//           }
//           reply(comments);
//         });
//       }
//     });
//   }
// }]);
