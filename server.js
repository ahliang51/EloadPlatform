'use strict';
let express = require('express'),
    path = require('path'),
    bodyParser = require('body-parser'),
    async = require('async'),
    cors = require('cors'),
    mysql = require('mysql'),
    jwt = require('jsonwebtoken'),
    app = express();



//Specifies the port number
let port = process.env.PORT || 3100;

//Import Routes
let auth = require('./routes/auth');

//Body Parser Middleware
app.use(bodyParser.json());

//CORS
app.use(cors())

//Initialise Connection
let connection = mysql.createConnection({
    host: 'ec2-18-219-254-128.us-east-2.compute.amazonaws.com',
    user: 'root',
    password: 'pNetMarket',
    database: 'Eload',
    port: 3306
});


connection.connect(error => {
    if (error) {
        console.error('error connecting: ' + error.stack);
        return;
    }
    console.log('connected as id ' + connection.threadId);

})

app.use(function (req, res, next) {
    req.connection = connection;
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.use('/auth', auth);

app.post('/test', (req, res, next) => {
    connection.query('SELECT * FROM SYSUSER', (err, result) => {
        console.log(result)
    })
});






//Start the server 
app.listen(port, () => {
    console.log('Server started on port' + port);
});