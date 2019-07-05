const config = require('../config');
const express = require('express');
const router = express.Router();
const requestPromise = require('request-promise');


router.put('/', (req, res) => {
    Promise.all(config.broadcastUrls.map((url) => sendToUrl(url))).then((broadcastResponses) => {
        console.log('all done with broadcast responses', broadcastResponses);
        res.send(JSON.stringify({ broadcastResponses }));
    });

});

// Notes:
// this currently only does GET requests, override the method in the options below for any POST updates if needed
// no proxy is set because aws doesn't need one, if want to run this greenside you will need to set the proxy object - i would recommend driving this from .env
function sendToUrl(url) {
    console.log('sending request to url', url);

    const requestPromiseOptions = {
        uri: url,
        resolveWithFullResponse: true
    };

    return requestPromise(requestPromiseOptions)
        .then((response) => {
            return url + ' ' + response.statusCode;
        })
        .catch((err) => {
            // console.error(err); makes content a bit verbose
            return url + ' ' + err.statusCode;
        });
}

module.exports = router;