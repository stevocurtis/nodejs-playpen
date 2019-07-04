const dotenv = require('dotenv').config();
var broadcastUrls = [];

console.log('parsing BROADCAST_URLS env property');
if (process.env.BROADCAST_URLS) {
    console.log('parsing BROADCAST_URLS', process.env.BROADCAST_URLS);
    broadcastUrls = process.env.BROADCAST_URLS.split(' ');
    console.log('broadcastUrls', broadcastUrls);
} else {
    console.warn('process.env.BROADCAST_URLS is not set');

}

module.exports.port = process.env.PORT;
module.exports.broadcastUrls = broadcastUrls;