const config = require('../config');
const express = require('express');
const router = express.Router();
const requestPromise = require('request-promise');

//app.use(express.json());

//router.options('/create', (req, res) => {
//

//   res.send();
//});

router.post('/create', (req, res) => {
   // Promise.all(config.assuranceUrls.map((url) => sendToUrl(url))).then((eventResponses) => {
   	console.log("REQUEST BODY" + req.body);
   	console.log("REQUEST BODY JSON" + JSON.stringify(req.body));

	sendToUrl(config.assuranceUrl, req.body);
    //console.log('all done with event responses', eventResponses);
   res.send(JSON.stringify({ status: "done" }));
   // });

});

function sendToUrl(url, requestBody) {
    console.log('sending request to url', url);
    //console.log('with payload', config.eventPayload);

    const requestPromiseOptions = {
        method: 'POST',
        headers: {
            'Authorization': config.assuranceAuthString,
            'Accept': 'application/json',
            'Content-Type': 'application/json'    
        },
    	body: requestBody,
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
