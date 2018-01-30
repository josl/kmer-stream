#!/usr/bin/env node

const express = require('express');
const Console = require('console');
const bodyParser = require('body-parser');
const fs = require('fs');
const app = express();
const server = require('http').Server(app);
const https = require('https');
const helmet = require('helmet');

app.use(helmet());

app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Credentials', true);
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
});

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

app.listen(3000, () => console.log('Example app listening on port 3000!'))

// create application/json parser
var textParser = bodyParser.raw();

app.get('/', function (req, res) {
    res.send('Hello World!');
});

app.post('/kmers', textParser, function (req, res) {
    if (!req.body) {
        return res.sendStatus(400);
    }
    console.log('new request!', req.body);
    req.setEncoding('utf8');
    var kmers = '';
    req.on('data', function (chunk) {
            kmers += chunk.toString();
        })
        .on('end', function () {
            var kmerMap = JSON.parse(kmers);
            console.log(kmerMap);
        });
});
