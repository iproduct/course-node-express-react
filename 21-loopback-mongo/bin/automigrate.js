'use strict';

let path = require('path');

var app = require(path.resolve(__dirname, '../server/server'));
var ds = app.datasources.mongodb;
ds.automigrate('User', function(err) {
  if (err) throw err;

  var users = [
    {
      username: 'john',
      email: 'john@fmi.com',
      password: 'john',
    },
    {
      username: 'jane',
      email: 'jane@fmi.com',
      password: 'jane',
    },
    {
      username: 'bob',
      email: 'bob@fmi.com',
      password: 'bob',
    },

  ];
  var count = users.length;
  users.forEach(function(account) {
    app.models.User.create(account, function(err, model) {
      if (err) throw err;

      console.log('Created:', model);

      if (model.username === 'bob') {
        app.models.Role.create({
          name: 'admin',
        }, function(err, role) {
          if (err) return debug(err);
          debug(role);

          // Make Bob an admin
          role.principals.create({
            principalType: app.models.RoleMapping.USER,
            principalId: model.id,
          }, function(err, principal) {
            if (err) return debug(err);
            debug(principal);
          });
        });
      }

      count--;
      if (count === 0)
        ds.disconnect();
    });
  });
});

function debug(message) {
  console.log(message);
}

