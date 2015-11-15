var r = require('rethinkdb');
var config = require('config');
require('rethinkdb-init')(r);
var rethinkdbConfig = config.get('rethinkdb');

function createConnection(req, res, next) {
    r.connect(rethinkdbConfig, function(error, conn) {
        if (error) {
            handleError(res, error);
        }
        else {
            // Save the connection in `req`
            req._rdbConn = conn;
            // Pass the current request to the next middleware
            next();
        }
    });
}

function handleError(res, error) {
    return res.send(500, {error: error.message});
}

function closeConnection(req, res, next) {
    if (req._rdbConn) {req._rdbConn.close();}
    next();
}

function init(app) {
  r.init(rethinkdbConfig, ['GroceryStores'])
    .then(function (){
      console.log('rethinkdb initialized successfully.')
    });
}


module.exports =  {
  createConnection : createConnection,
  closeConnection : closeConnection,
  init : init
};
