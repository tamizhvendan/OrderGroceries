var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');
var config = require('config');
var rethinkdb = require('./rethinkdbInit.js');
var expressExpose = require('express-expose');
var app = expressExpose(express());

var publicPath = path.resolve(__dirname, '../client/public');

app.use('/public', express.static(publicPath));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


app.set('views', path.resolve(__dirname, '../client'));
app.set('view engine', 'jade');
app.get('*', function(req, res) {
  var clientConfig = {};
  var auth0Config = config.get('auth0');
  clientConfig.auth0 = {clientID : auth0Config.clientID, domain : auth0Config.domain};
  res.expose(clientConfig,'config');
  res.render('index', {title : 'Order Groceries'});
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
