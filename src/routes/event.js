const config = require('../config');
const express = require('express');
const router = express.Router();
const requestPromise = require('request-promise');


router.post('/', (req, res) => {
    Promise.all(config.eventUrls.map((url) => sendToUrl(url))).then((eventResponses) => {
        console.log('all done with event responses', eventResponses);
        res.send(JSON.stringify({ eventResponses }));
    });

});

function sendToUrl(url) {
    console.log('sending request to url', url);
    console.log('with payload', config.eventPayload);

    const requestPromiseOptions = {
    	method: 'POST',
    	body: config.eventPayload,
        uri: url,
        json: true,
        resolveWithFullResponse: true
    };

    return requestPromise(requestPromiseOptions)
        .then((response) => {
        	console.log(response.body);
            return url + ' ' + response.statusCode;
        })
        .catch((err) => {
            // console.error(err); makes content a bit verbose
            return url + ' ' + err.statusCode;
        });
}

module.exports = router;