'use strict';
//Import
let express = require('express'),
    router = express.Router(),
    bodyParser = require('body-parser'),
    async = require('async'),
    http = require('http'),
    config = require('../config/config'),
    jwt = require('jsonwebtoken'),
    bigCommerce, bigCommerceV3, connection;

// Group by Function
Array.prototype.groupBy = function (prop) {
    return this.reduce(function (groups, item) {
        const val = item[prop]
        groups[val] = groups[val] || []
        groups[val].push(item)
        return groups
    }, {})
}

router.post('/retrieve-user', (req, res, next) => {
    //Retrieve bigCommerce Connection
    bigCommerce = req.bigCommerce;

    async.waterfall([
        retrieveUserInfo,
        retrieveOrders,
        retrieveProductInformation
    ], function (err, result) {
        if (err) {
            res.json({
                success: false,
                message: err
            })
        } else {
            res.json({
                success: true,
                result: result
            })
        }
    });

    function retrieveUserInfo(callback) {
        let callbackExist = false;
        if (req.body.userInfo.accessCode) {
            bigCommerce.get('/customers').then(data => {
                for (let user of data) {
                    if (user.notes == req.body.userInfo.accessCode) {
                        callbackExist = true;
                        callback(null, user)
                    }
                }
                if (!callbackExist) {
                    callback("No such user")
                }
            })
        } else {
            bigCommerce.get('/customers').then(data => {
                console.log(data)
                for (let user of data) {
                    if (user.phone == req.body.userInfo.phoneNumber) {
                        callbackExist = true;
                        callback(null, user)
                    }
                }
                if (!callbackExist) {
                    callback("No such user")
                }
            })
        }

    }

    function retrieveOrders(result, callback) {
        bigCommerce.get('/orders?customer_id=' + result.id).then(data => {
            callback(null, {
                userInfo: result,
                orderInfo: data
            })
        })
    }

    function retrieveProductInformation(result, callback) {
        // console.log(result)
        let orderInfo = result.orderInfo;
        let callbackArray = [];
        let productInfoArray = [];
        let resultArray = [];

        async.each(orderInfo,
            function retrieveInfo(order, callback) {
                bigCommerce.get(order.products.resource)
                    .then(data => {
                        data.date_created = order.date_created;
                        data.total = order.subtotal_inc_tax;
                        callbackArray.push(data)
                        callback()
                    });
            }, err => {
                // console.log(result)
                for (let orderArray of callbackArray) {
                    for (let order of orderArray) {
                        let temp = {
                            order_id: order.order_id,
                            name: order.name,
                            quantity: order.quantity,
                            date_created: orderArray.date_created,
                            total: orderArray.total
                        }
                        productInfoArray.push(temp)
                    }
                }
                if (productInfoArray.length > 0) {
                    //Group by Order Id
                    result.orderInfo = productInfoArray.groupBy('order_id');
                    // Sort Order Id by descending
                    console.log(result.orderInfo)
                }
                callback(null, result)
            });


        // for (let order of orderInfo) {
        //     bigCommerce.get(order.products.resource).then(data => {
        //         console.log(data)
        //     })
        // }
    }
});

router.post('/test', (req, res, next) => {
    //Retrieve bigCommerce Connection
    bigCommerce = req.bigCommerce;

    bigCommerce.get('/orders/124/products').then(data => {
        res.json(data)
    });

})


module.exports = router;