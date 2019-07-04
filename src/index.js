const dotenv = require('dotenv').config();
const express = require('express');
const app = express();

app.use((req, res, next) => {
    res.setHeader('Content-Type', 'application/json')
    next();
});

// routes
app.get('/ping', (req, res) => {
    res.send(JSON.stringify({ data: "ping" }));
});

app.get('/ping2', (req, res) => {
    res.send(JSON.stringify({ data: "ping" }));
});

app.put('/broadcast', (req, res) => {
    res.send(JSON.stringify({ data: "broadcast" }));
});

const port = process.env.PORT;
app.listen(port, () => {
    console.log('app listening on port ' + port);
});