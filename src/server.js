// const dotenv = require('dotenv').config();
const config = require('./config');
const express = require('express'),
    ping = require('./routes/ping'),
    broadcast = require('./routes/broadcast'),
    event = require('./routes/event');

const app = express();

// common
app.use((req, res, next) => {
    res.setHeader('Content-Type', 'application/json')
    next();
});

// routes
app.use('/ping', ping);
app.use('/broadcast', broadcast);
app.use('/event', event);

app.listen(config.port, () => {
    console.log('node js playpen server running on port', config.port);
});