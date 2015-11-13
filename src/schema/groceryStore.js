module.exports = {
  properties : {
    storeName : {
      type : 'string',
      maxLength : 25,
      required : true,
      allowEmpty : false,
      messages: {
        type: 'Invalid Store Name',
        maxLength: 'Store Name should not contain more than 25 characters',
        required : 'Store Name should not be empty',
        allowEmpty : 'Store Name should not be empty'
      }
    },
    email : {
      type : 'string',
      format : 'email',
      maxLength : 255,
      required : true,
      allowEmpty : false,
      messages: {
        type: 'Invalid Email Address',
        format: 'Invalid Email Address',
        maxLength: 'Email Address should not contain more than 255 characters',
        required : 'Email Address should not be empty',
        allowEmpty : 'Email Address should not be empty'
      }
    },
    password : {
      type: 'string',
      minLength: 8,
      maxLength: 12,
      required: true,
      allowEmpty: false,
      messages: {
        type: 'Invalid Password',
        format: 'Invalid Password',
        maxLength: 'Password should not contain more than 12 characters',
        minLength: 'Password should contain atleast 8 characters',
        required : 'Password should not be empty',
        allowEmpty : 'Password should not be empty'
      }
    },
    confirmPassword : {
      type: 'string',
      minLength: 8,
      maxLength: 12,
      required: true,
      allowEmpty: false,
      conform : function (value, obj) {
        return value === obj.password;
      },
      messages: {
        type: 'Invalid Confirm Password',
        format: 'Invalid Confirm Password',
        maxLength: 'Confirm Password should not contain more than 12 characters',
        minLength: 'Confirm Password should contain atleast 8 characters',
        required : 'Confirm Password should not be empty',
        allowEmpty : 'Confirm Password should not be empty',
        conform : 'Confirm Password should match the password'
      }
    },
    addressLine1 : {
      type : 'string',
      maxLength : 35,
      required : true,
      allowEmpty : false,
      messages: {
        type: 'Invalid Address Line1',
        maxLength: 'Address Line1 should not contain more than 35 characters',
        required : 'Address Line1 should not be empty',
        allowEmpty : 'Address Line1 should not be empty',
      }
    },
    addressLine2 : {
      type : 'string',
      maxLength : 35
    },
    zipCode : {
      type : 'string',
      pattern : /^[0-9]+$/,
      minLength : 6,
      maxLength : 6,
      messages: {
        type: 'Invalid Zip Code',
        format: 'Invalid Zip Code',
        maxLength: 'Zip Code should contain only 6 digits',
        minLength: 'Zip Code should contain only 6 digits',
        required : 'Zip Code should not be empty',
        allowEmpty : 'Zip Code should not be empty',
        pattern : 'Invalid Zip Code'
      }
    },
    mobile : {
      type : 'string',
      pattern : /^[0-9]+$/,
      minLength : 10,
      maxLength : 11,
      messages: {
        type: 'Invalid Mobile Number',
        format: 'Invalid Mobile Number',
        maxLength: 'Mobile Number should contain only 6 digits',
        minLength: 'Mobile Number should contain only 6 digits',
        required : 'Mobile Number should not be empty',
        allowEmpty : 'Mobile Number should not be empty',
        pattern : 'Invalid Mobile Number'
      }
    }
  }
};
