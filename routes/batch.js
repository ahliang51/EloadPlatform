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

router.post('/generate-batch', (req, res, next) => {

    connection = req.connection;

    async.waterfall([
        retrieveUsername,
        generateBatch
    ], function (err, result) {
        if (err) {
            res.json({
                success: false,
                message: err
            })
        } else {
            res.json({
                success: result.success,

                //If there is any message, then assign the message if not it will be empty
                message: result.message ? result.message : ""
            })
        }
    });

    function retrieveUsername(callback) {
        jwt.verify(req.body.token, config.jwtSecret, function (err, decoded) {
            if (err) {
                callback(err)
            } else {
                callback(null, decoded.username)
            }
        });
    }

    function generateBatch(username, callback) {
        connection.query(`CALL WEB_NEW_BATCH_GENERATE(?,?,?,?,?,?)`, [req.body.batchName, req.body.header, req.body.quantity, req.body.amount, req.body.expiryDate, username],
            (err, result, fields) => {
                // console.log(result)
                // console.log(err)
                let status = JSON.parse(JSON.stringify(result[0][0])).STATUS;
                console.log(status);
                // callback(null, status)
                if (status == 0) {
                    callback(null, {
                        success: true
                    })
                } else {
                    callback(null, {
                        success: false,
                        message: "There is an error"
                    })
                }
            });
    }
});


router.get('/list-batch', (req, res, next) => {
    connection = req.connection;
    connection.query(`SELECT * FROM BATCH`,
        (err, result, fields) => {
            res.json(result)
        })
});

router.post('/export-batch', (req, res, next) => {
    connection = req.connection;
    connection.query(`CALL WEB_EXPORT_BATCH(?)`, req.body.batchNo,
        (err, result, fields) => {
            res.json(result)
        })
});

router.post('/print-batch', (req, res, next) => {
    connection = req.connection;
    connection.query(`CALL WEB_PRINT_BATCH(?)`, req.body.batchNo,
        (err, result, fields) => {
            res.json(result)
        })
});

router.post('/activate-batch', (req, res, next) => {
    connection = req.connection;
    connection.query(`CALL WEB_ACTIVATE_BATCH(?)`, req.body.batchNo,
        (err, result, fields) => {
            res.json(result)
        })
});

router.post('/list-voucher', (req, res, next) => {
    connection = req.connection;
    connection.query(`SELECT * FROM VOUCHERS WHERE BATCH_NO = (?)`, req.body.batchNo,
        (err, result, fields) => {
            res.json(result)
        })
});

router.post('/view-transactions', (req, res, next) => {
    connection = req.connection;
    console.log(req.body)
    connection.query(`CALL WEB_QUERY_TRANSACTION(?,?,?,?)`, [req.body.startDate, req.body.endDate, req.body.accessCode, req.body.phoneNumber],
        (err, result, fields) => {
            console.log(result)
            res.json(result)
        })
});

router.post('/test', (req, res, next) => {
    connection = req.connection;
    connection.query(`SELECT * FROM TRANSACTIONS`,
        (err, result, fields) => {
            console.log(result)
            res.json(result)
        })
});



module.exports = router;