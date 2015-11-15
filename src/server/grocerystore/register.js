var groceryStoreSchema = require('../../schema/groceryStore.js');
var revalidator = require('revalidator');
var repo = require('./repo.js');

module.exports = function(app) {

  app.post('/api/grocerystore', function(req,res){

    var newGroceryStore = req.body;
    var validationResult = revalidator.validate(newGroceryStore, groceryStoreSchema);

    if (validationResult.valid) {
      var groceryStore = {
        storeName : newGroceryStore.storeName,
        addressLine1 : newGroceryStore.addressLine1,
        addressLine2 : newGroceryStore.addressLine2,
        email : newGroceryStore.email,
        mobile : newGroceryStore.mobile,
        zipCode : newGroceryStore.zipCode
      }
      repo.createStore(groceryStore, newGroceryStore.password, req._rdbConn, function(err, newStore){
        if (err) {
          if (err.statusCode === 500) {
            res.status(500).json({message : err.message});
          }
          else {
            res.status(400).json(err);
          }
        } else {
          res.json(newStore);
        }
      });
    } else {
      var errors = validationResult.errors.reduce((errors, error) => {
          errors[error.property] = error.message;
          return errors;
      }, {});

      res.status(400).json(errors);
    }
  });

}
