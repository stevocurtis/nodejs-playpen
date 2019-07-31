const config = require('../config');
const express = require('express');
const router = express.Router();
const requestPromise = require('request-promise');


router.post('/create', (req, res) => {
   // Promise.all(config.assuranceUrls.map((url) => sendToUrl(url))).then((eventResponses) => {
        sendToUrl(config.assuranceUrl);
    //console.log('all done with event responses', eventResponses);
  
   res.send(JSON.stringify({ status: "done" }));
   // });

});

function sendToUrl(url) {
    console.log('sending request to url', url);
    //console.log('with payload', config.eventPayload);

    const requestPromiseOptions = {
        method: 'POST',
        headers: {
            'Authorization': 'Basic YWRtaW46SGc1NjYhQUJD',
            'Accept': 'application/json',
            'Content-Type': 'application/json'    
        },
    	body: {
            'short_description': 'Test case Robert from node', 
            'channel': 'Web', 
            'priority': '3 - Moderate'
        },
        uri: url,
        json: true,
        resolveWithFullResponse: true
    };

    console.log('options ', requestPromiseOptions);

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