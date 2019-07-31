var bssInventoryBroadcast = require('./bss-inventory-broadcast');
var chai = require('chai');
const fs = require('fs');

describe('BSS Inventory Broadcast Tests', function() {

    beforeEach(function() {
        let bssExampleInventoryBroadcastRaw = fs.readFileSync('src/integration/bss/bss-inventory-broadcast-sample.json');
        let bssExampleInventoryBroadcast = JSON.parse(bssExampleInventoryBroadcastRaw);

        this.enrichedOrderItems = bssInventoryBroadcast.parseAndEnrichBSSInventoryBroadcast(bssExampleInventoryBroadcast);
    });

    it('should parse order items', function() {
        // check number of items
        chai.assert.equal(this.enrichedOrderItems.length, 15, 'different number of order items processed');
        // check id and parent id
        chai.assert.equal(this.enrichedOrderItems[0].id, '5a625fe3-9db4-40cd-82c0-169c45d68569', 'primary id does not match');
        chai.assert.equal(this.enrichedOrderItems[0].parentId, 'de39707b-d775-46a5-b61a-e501fac0e6f9', 'parent id does not match');
        chai.assert.equal(this.enrichedOrderItems[0].type, 'CFS', 'type does not match');
    });

    it('should process enriched order items', function() {
        // process items
        // TODO work here this evening
        // bssInventoryBroadcast.writeEnrichedBSSInventoryItems(this.enrichedOrderItems);
    });
});