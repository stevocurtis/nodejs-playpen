var bssInventoryBroadcast = require('./bss-inventory-broadcast');
var chai = require('chai');

describe('BSS Inventory Broadcast Tests', function() {

    it('should be truthy', function() {
        chai.assert.isOk(bssInventoryBroadcast.processOnmi('test'));
    });
});