var express = require('express');
var app = express();
var path = require('path');
var r = require('rethinkdb');
require('rethinkdb-init')(r);
var config = require('config');
var rethinkdbConfig = config.get('rethinkdb');
var publicPath = path.resolve(__dirname, '../client/public');

app.use('/public', express.static(publicPath));


app.use(createConnection);
app.use(closeConnection);

app.get('/', function(req, res) {
  res.sendFile(path.resolve(__dirname, '../client/index.html'));
});


function startServer() {
  var server = app.listen(config.get('express').port, function () {
    var host = server.address().address;
    var port = server.address().port;

    console.log('Order Groceries app listening at http://%s:%s', host, port);
  });
}



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

function closeConnection(req, res, next) {
    if (req._rdbConn) {req._rdbConn.close();}
    next();
}

function handleError(res, error) {
    return res.send(500, {error: error.message});
}

console.log('initializing Rethinkdb');
console.log(rethinkdbConfig);
r.init(rethinkdbConfig, [])
  .then(function(conn, err){
    if (err) {
      console.log('Rethinkdb not available');
      console.log(err.message)
      process.exit(1);
    }
    console.log('Rethinkdb initialized successfully');
    startServer();
  });
