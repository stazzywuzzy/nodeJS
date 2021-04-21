let mongoose = require('mongoose'),
  Schema = mongoose.Schema,
  passportLocalMongoose = require('passport-local-mongoose');

const Account = new Schema({
    firstName: String,
    lastName: String,
    phoneNumber: String,
    street: String,
    postalCode: String,
    province: String,
    country: String
});

//This following method makes Account have properties username and password and in addition
//add a whole bunch of static methods on the Account class
Account.plugin(passportLocalMongoose);

module.exports = mongoose.model('Account', Account);