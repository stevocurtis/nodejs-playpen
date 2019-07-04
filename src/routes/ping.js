const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.send(JSON.stringify({ data: "ping" }));
});

module.exports = router;