const dotenv = require('dotenv').config();

module.exports.port = process.env.PORT;
module.exports.httpClientTimeoutMs = process.env.HTTP_CLIENT_TIMEOUT_MS;

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

module.exports.broadcastUrls = broadcastUrls;