'use strict';
//Import
let express = require('express'),
    router = express.Router(),
    bodyParser = require('body-parser'),
    async = require('async'),
    http = require('http'),
    config = require('../config/config'),
    jwt = require('jsonwebtoken'),
    connection;

router.post('/login', (req, res, next) => {

    connection = req.connection;

    async.waterfall([
        queryDatabase,
        generateToken
    ], function (err, result) {
        if (err) {
            res.json({
                success: false,
                message: err
            })
        } else {
            res.json({
                success: result.success,
                // If there is token, then assign the token if not it will be empty
                token: result.token ? result.token : "",

                //If there is any message, then assign the message if not it will be empty
                message: result.message ? result.message : ""
            })
        }
    });

    function queryDatabase(callback) {
        connection.query(`CALL WEB_CHECK_LOGIN(?,?,?)`, [req.body.username, req.body.password, req.body.ipAddress], (err, result, fields) => {
            let status = JSON.parse(JSON.stringify(result[0][0])).STATUS;
            console.log(status);
            callback(null, status)
        });

    }

    function generateToken(status, callback) {
        if (status == 0) {
            jwt.sign({
                loggedIn: true,
                username: req.body.username
            }, config.jwtSecret, {
                expiresIn: '7d'
            }, function (err, token) {
                if (err)
                    callback(true)
                else
                    callback(null, {
                        success: true,
                        token: token
                    })
            })
        } else
            callback(null, {
                success: false,
                message: "No Such User"
            })
    }
});

router.post('/isUserLoggedIn', (req, res, next) => {
    jwt.verify(req.body.token, config.jwtSecret, function (err, decoded) {
        if (err) {
            res.json({
                result: false
            })
        } else {
            if (decoded.loggedIn)
                res.json({
                    result: true,
                })
            else {
                res.json({
                    result: false,
                })
            }
        }
    });
})

module.exports = router;