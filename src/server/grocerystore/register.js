var groceryStoreSchema = require('../../schema/groceryStore.js');
var revalidator = require('revalidator');

module.exports = function(app) {

  app.post('/api/grocerystore', function(req,res){
    var newGroceryStore = req.body;
    var validationResult = revalidator.validate(newGroceryStore, groceryStoreSchema);
    if (validationResult.isValid) {
      res.json(newGroceryStore);
    } else {
      var errors = validationResult.errors.reduce((errors, error) => {
          errors[error.property] = error.message;
          return errors;
      }, {});

      res.status(400).json(errors);
    }
  });

}
