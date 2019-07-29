var bssInventoryBroadcast = require('./bss-inventory-broadcast');
var chai = require('chai');
const fs = require('fs');

describe('BSS Inventory Broadcast Tests', function() {

    it('should parse order items', function() {

        let bssExampleInventoryBroadcastRaw = fs.readFileSync('src/data/bss/bss-inventory-broadcast-sample.json');
        let bssExampleInventoryBroadcast = JSON.parse(bssExampleInventoryBroadcastRaw);

        let processedOrderItems = bssInventoryBroadcast.getAssetProcessItems(bssExampleInventoryBroadcast);

        // check number of items
        chai.assert.isOk(processedOrderItems.length, 15, 'different number of order items processed');
        // check id and parent id
        chai.assert.isOk(processedOrderItems[0].id, '5a625fe3-9db4-40cd-82c0-169c45d68569', 'primary id does not match');
        chai.assert.isOk(processedOrderItems[0].parentId, 'de39707b-d775-46a5-b61a-e501fac0e6f9', 'parent id does not match');
        chai.assert.isOk(processedOrderItems[0].type, 'CFS', 'type does not match');
    });
});