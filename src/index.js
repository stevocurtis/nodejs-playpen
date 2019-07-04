const dotenv = require('dotenv').config();
const express = require('express');
const app = express();

app.use(function(req, res, next) {
    res.setHeader('Content-Type', 'application/json')
    next();
});

// routes
app.get('/', function(req, res) {
    res.send(JSON.stringify({ data: "ping" }));
});

app.get('/broadcast', function(req, res) {
    res.send(JSON.stringify({ data: "broadcast" }));
});

const port = process.env.PORT;
app.listen(port, function() {
    console.log('app listening on port ' + port);
});