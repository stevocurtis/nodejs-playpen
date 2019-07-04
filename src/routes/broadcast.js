const express = require('express');
const router = express.Router();

router.put('/', (req, res) => {
    res.send(JSON.stringify({ data: "broadcast" }));
});

module.exports = router;