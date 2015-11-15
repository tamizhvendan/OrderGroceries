var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');
var config = require('config');
var rethinkdb = require('./rethinkdbInit.js');
var app = express();

var publicPath = path.resolve(__dirname, '../client/public');

app.use('/public', express.static(publicPath));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());



app.get('*', function(req, res) {
  res.sendFile(path.resolve(__dirname, '../client/index.html'));
});


function startServer() {
  var server = app.listen(config.get('express').port, function () {
    var host = server.address().address;
    var port = server.address().port;

    console.log('Order Groceries app listening at http://%s:%s', host, port);
  });
}

rethinkdb.init(app);
app.use('/api', rethinkdb.createConnection);
require('./grocerystore/register.js')(app);
app.use('/api', rethinkdb.closeConnection);
startServer();
