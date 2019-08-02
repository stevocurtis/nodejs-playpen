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

    var requestBody = req.body;
    var url = config.assuranceUrl;

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

    requestPromise(requestPromiseOptions) 
        .then(function(response) {
            console.log('case number' + response.body.result.number);
            res.send(JSON.stringify({ case_number: response.body.result.number }));
        })
        .catch(function(err) {
            res.send(JSON.stringify({ error:  error }));
        });


    console.log("REQUEST BODY" + req.body);
    console.log("REQUEST BODY JSON" + JSON.stringify(req.body));

    //Promise.all(sendToUrl(config.assuranceUrl, req.body)).then((eventResponse) => {
 

    //var cn = sendToUrl(config.assuranceUrl, req.body);
       // console.log('next case number' + eventResponse);
    //console.log('all done with event responses', eventResponses);
     //   res.send(JSON.stringify({ case_number:  eventResponse}));
});




module.exports = router;
