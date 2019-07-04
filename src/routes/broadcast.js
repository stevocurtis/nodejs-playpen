const config = require('../config');
const express = require('express');
const router = express.Router();

router.put('/', (req, res) => {
    config.broadcastUrls.forEach(element => {
        console.log('processing broadcast url', element);
    });
    res.send(JSON.stringify({ data: "broadcast" }));
});

module.exports = router;