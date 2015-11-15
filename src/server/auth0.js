var Auth0 = require('auth0');
var config = require('config');
var auth0Config = config.get('auth0');

module.exports = new Auth0({
  domain : auth0Config.domain,
  clientID : auth0Config.clientID,
  clientSecret : auth0Config.clientSecret
})
