'use strict';

const fs = require('fs');

module.exports = class ArticleService {
  constructor(filename) {
    this.filename = filename;
  }

  findAll(callback) {

    debugger
    fs.readFile(this.filename, function (err, data) {
      if(!callback & err) throw err;
      if (err) callback(err);
      callback && callback(null, JSON.parse(data));
    });
  }

  add(newArticle, callback) {
    fs.readFile(this.filename, (err, data) => {
      if(!callback & err) throw err;
      if (err) callback(err);
      newArticle.id = Date.now();
      var articles = JSON.parse(data);
      articles.push(newArticle);
      fs.writeFile(this.filename, JSON.stringify(articles, null, 4), function (err) {
        if(!callback & err) throw err;
        if (err) callback(err);
        callback && callback(null, articles, newArticle);
      });
    });
  }

  delete(articleId, callback) {
    fs.readFile(this.filename, (err, data) => {
      if(!callback & err) throw err;
      if (err) callback(err);
      let articles = JSON.parse(data);
      let deleted;
      articles = articles.filter((article, index) => {
        if (article.id == articleId) {
          deleted = article;
          return false;
        } else {
          return true;
        }
      });

      if (!deleted) {
        callback && callback(new Error(`Article with id=${articleId} does not exist.`), articles);
      } else {
        fs.writeFile(this.filename, JSON.stringify(articles, null, 4), function (err) {
          if(!callback & err) throw err;
          if (err) callback(err);
          callback && callback(null, articles, deleted);
        });
      }
    });
  }
  
}

