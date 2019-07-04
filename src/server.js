const dotenv = require('dotenv').config();
const express = require('express'),
    ping = require('./routes/ping'),
    broadcast = require('./routes/broadcast');

const app = express();

// common
app.use((req, res, next) => {
    res.setHeader('Content-Type', 'application/json')
    next();
});

// routes
app.use('/ping', ping);
app.use('/broadcast', broadcast);

const port = process.env.PORT;
app.listen(port, () => {
    console.log('node js playpen server running on port', port);
});