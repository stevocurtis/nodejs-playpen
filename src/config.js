const dotenv = require('dotenv').config();

module.exports.port = process.env.PORT;
module.exports.httpClientTimeoutMs = process.env.HTTP_CLIENT_TIMEOUT_MS;
module.exports.eventPayload = process.env.EVENT_PAYLOAD;
module.exports.assuranceUrl = process.env.ASSURANCE_URL;
module.exports.assuranceAuthString = process.env.ASSURANCE_BASIC_AUTH_STRING;

// parse broadcast urls
var broadcastUrls = [];
console.log('parsing BROADCAST_URLS env property');
if (process.env.BROADCAST_URLS) {
    console.log('parsing BROADCAST_URLS', process.env.BROADCAST_URLS);
    broadcastUrls = process.env.BROADCAST_URLS.split(' ');
    console.log('broadcastUrls', broadcastUrls);
} else {
    console.warn('process.env.BROADCAST_URLS is not set');
}

// parse event urls
var eventUrls = [];
console.log('parsing EVENT_URLS env property');

if (process.env.EVENT_URLS) {
    console.log('parsing EVENT_URLS', process.env.EVENT_URLS);
    eventUrls = process.env.EVENT_URLS.split(' ');
    console.log('eventUrls', eventUrls);
} else {
    console.warn('process.env.EVENT_URLS is not set');
}

console.log('the event payload is ', process.env.EVENT_PAYLOAD);

module.exports.broadcastUrls = broadcastUrls;
module.exports.eventUrls = eventUrls;