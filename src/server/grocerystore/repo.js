var r = require('rethinkdb');
var auth0 = require('../auth0.js');
var config = require('config');

function createStore(store,password, conn, callback) {
  var newUser = {
    connection : config.get('auth0').connection,
    email : store.email,
    password : password,
    userType : 'store'
  };
  auth0.createUser(newUser, function(err, userInfo){
    if (err) {
      if (err.statusCode === 400) {
        if (err.code === 'user_exists') {
          callback({email : 'Email address already exists'});
        } else if (prop === 'bad.password'){
          callback({password : 'Password is not strong'})
        } else {
          callback({email : 'Failed to create new user'});
        }
      } else {
        callback({statusCode : 500, message : "Failed to create new user"});
      }
    } else {
      store["auth0Id"] = userInfo._id;
      r.table('GroceryStores')
        .insert(store, {returnChanges : true})
        .run(conn)
        .then(function(result){
          if (result.inserted != 1) {
            callback({message : 'Failed to create new store'});
          } else {
            callback(null, result.changes[0].new_val);
          }
        })
        .error(function (error) {
          callback(error);
        });
    }
  });
}

module.exports = {
  createStore : createStore
}
