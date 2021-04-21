const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const orderSchema = new Schema({
    userName: String,
    size : String,
    sizeCost : Number,
    crust : String,
    crustCost : Number,
    toppings : [{type: String}],
    toppingsCost : Number,
    quantity : String,
    subTotal : Number,
    total : Number,
    firstName : String,
    lastName : String,
    phoneNumber : String,
    address : String,
    status : String,
    orderId: String,
    createdOn : {type : Date, default : Date.now}
});

module.exports = mongoose.model('Order', orderSchema);