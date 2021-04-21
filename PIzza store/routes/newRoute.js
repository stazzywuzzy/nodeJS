var express = require('express');
const Order = require('../models/Order');
const Price = require('../public/javascripts/priceCalculator');
var uuidv4 = require('uuid/v4');

var router = express.Router();

function apiAuthenticationMiddleware(req, res, next) {
    if (req.isAuthenticated()) {
      return next()
    }
    res.status(401).json({error : 'Unauthenticated request'});
  }

router.get('/', apiAuthenticationMiddleware, (req, res)=> {
    Order.find({}, (err, order) => {
        res.json(order);
    });
 });

 router.get('/current', apiAuthenticationMiddleware, (req, res)=> {
    let userName = req.user.username
    Order.find({userName: userName}, function(err, orders) {
        console.log(orders);
        res.json({orders});
    });
 });

router.post('/', apiAuthenticationMiddleware, (req, res)=> {
    let orderBody = req.body;
    orderBody.sizeCost = Price.calculateSizePrice(orderBody.size);
    orderBody.crustCost = Price.calculateCrustPrice(orderBody.crust);
    orderBody.toppingsCost = Price.totalToppingsCost(orderBody.toppings);
    orderBody.subTotal = Price.subTotal(orderBody.sizeCost, orderBody.crustCost, orderBody.toppingsCost, orderBody.quantity);
    orderBody.total = Price.total(orderBody.subTotal);
    orderBody.orderId = uuidv4();
    orderBody.userName = req.user.username

    if (!orderBody.quantity || !orderBody.toppings) {
        return res.status(400).json({ error: 'Requires quantity and toppings' });
    }

    let order = new Order(orderBody);

    order.save((err) => {
        if (err) {
            console.log('Failed to save the order in Mongodb', err);
            res.status(500).json({ status: 'Failed to save the order' });
            return;
          }
      
          res.json({ status: 'Successfully added the order' });
    });
});

router.put('/',apiAuthenticationMiddleware, (req, res)=> {
    Order.findOne({orderId: req.body.uuid}, function(err, doc) {
        if (err) {
            console.log('Failed to find document', err);
            res.status(500).json({ status: 'Failed to updated order' });
            return
        }
        doc.status = 'created'
        doc.save();
    });
    res.json({ status: 'Successfully created the order' });
});

module.exports = router;