'use strict';
//Import
let express = require('express'),
    router = express.Router(),
    bodyParser = require('body-parser'),
    async = require('async'),
    http = require('http'),
    config = require('../config/config'),
    jwt = require('jsonwebtoken'),
    storedProcedure = require('./stored-procedure'),
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

    async.waterfall([
        exportBatch,
        insertAccessLog
    ], function (err, result) {
        if (err) {
            res.json({
                message: err
            })
        } else {
            res.json(result)
        }
    });

    function exportBatch(callback) {
        connection.query(`CALL WEB_EXPORT_BATCH(?)`, req.body.batchNo,
            (err, result, fields) => {
                callback(null, result)
            })
    }

    function insertAccessLog(result, callback) {
        console.log(req.body)
        storedProcedure.insertAccessLog(config.eloadPlatformUser, req.body.ipAddress, "Export Batch", connection)
            .then(status => {
                callback(null, result)
            })
    }
});

router.post('/print-batch', (req, res, next) => {
    connection = req.connection;

    async.waterfall([
        printBatch,
        insertAccessLog
    ], function (err, result) {
        if (err) {
            res.json({
                message: err
            })
        } else {
            res.json(result)
        }
    });

    function printBatch(callback) {
        connection.query(`CALL WEB_PRINT_BATCH(?)`, req.body.batchNo,
            (err, result, fields) => {
                callback(null, result)
            })
    }

    function insertAccessLog(result, callback) {
        console.log(req.body)
        storedProcedure.insertAccessLog(config.eloadPlatformUser, req.body.ipAddress, "Print Batch", connection)
            .then(status => {
                callback(null, result)
            })
    }
});

router.post('/activate-batch', (req, res, next) => {
    connection = req.connection;

    async.waterfall([
        activateBatch,
        insertAccessLog
    ], function (err, result) {
        if (err) {
            res.json({
                message: err
            })
        } else {
            res.json(result)
        }
    });

    function activateBatch(callback) {
        connection.query(`CALL WEB_ACTIVATE_BATCH(?)`, req.body.batchNo,
            (err, result, fields) => {
                callback(null, result)
            })
    }


    function insertAccessLog(result, callback) {
        console.log(req.body)
        storedProcedure.insertAccessLog(config.eloadPlatformUser, req.body.ipAddress, "Activate Batch", connection)
            .then(status => {
                callback(null, result)
            })
    }

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
    connection.query(`CALL WEB_QUERY_TRANSACTION(?,?,?,?,?)`, [req.body.startDate, req.body.endDate, req.body.accessCode, req.body.phoneNumber, req.body.pinNumber],
        (err, result, fields) => {
            console.log(result)
            res.json(result)
        })
});

router.post('/view-pin-detail', (req, res, next) => {
    connection = req.connection;
    connection.query(`SELECT * FROM VOUCHERS INNER JOIN BATCH ON VOUCHERS.BATCH_NO = BATCH.BATCH_NO  WHERE PIN_NO = (?)`, req.body.pinNumber,
        (err, result, fields) => {
            let resultArray = [];
            resultArray.push(result)
            res.json(resultArray)
        })
});

router.post('/test', (req, res, next) => {
    // webAccessLog("Admin", "102.123.1.1", "qwdqwd", req.connection)
    connection = req.connection;
    // console.log("asdasd")
    // connection.query(`SELECT * FROM TRANSACTIONS`),
    //     (err, result, fields) => {
    //         console.log(result)
    //     }

    storedProcedure.insertAccessLog(config.eloadPlatformUser, "192.231.232.232", "TESTING IN PROGRESS", connection)
        .then(result => {
            console.log(result)
        })

});



module.exports = router;