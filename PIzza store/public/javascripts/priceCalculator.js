'use strict'

const _=require('lodash');
const tax = 0.05;

module.exports.PriceCalculator = class PriceCalculator {}

function roundToDecimal(amount) {
    return _.floor(amount, 2);
}

exports.calculateSizePrice = function(size) {
    switch (size) {
        case 'small':
            return 12;
        case 'medium':
            return 14;
        case 'large':
            return 20
    }
}

exports.calculateCrustPrice = function(crust) {
    switch (crust) {
        case 'regular':
            return 4;
        case 'thin':
            return 6;
        case 'deep':
            return 8
    }
}

exports.totalToppingsCost = function(toppings) {
    var selectedToppingsCosts = [];
    var totalToppingCost = 0
    toppings.forEach (toppingName =>{
        switch (toppingName) {
            case 'pepperoni':
                totalToppingCost += 5
                break;
            case 'anchovy':
                totalToppingCost += 3
                break;
            case 'ham':
                totalToppingCost += 3
                break;
            case 'bacon':
                totalToppingCost += 4
                break;
            case 'chicken':
                totalToppingCost += 4
                break;
        }
    });
    return totalToppingCost;
}

exports.subTotal = function(sizeCost, crustCost, toppingsCost, quantity) {
    return (sizeCost + crustCost + toppingsCost) * quantity;
}

exports.total = function(subTotal) {
    return roundToDecimal(subTotal * (1+tax));
}