var ossInventoryBroadcastNew = require('./oss-inventory-broadcast-new');
var chai = require('chai');
const fs = require('fs');

describe('OSS Inventory Broadcast Tests', function() {
    beforeEach(function() {
        let ossExampleInventoryBroadcastRaw = fs.readFileSync(
            'src/integration/oss/oss-inventory-broadcast-new-sample.json'
        );
        let ossExampleInventoryBroadcast = JSON.parse(
            ossExampleInventoryBroadcastRaw
        );

        this.enrichedOrderItems = ossInventoryBroadcastNew.parseAndEnrichOSSInventoryBroadcast(
            ossExampleInventoryBroadcast
        );
    });

    it('should parse order items', function() {
        // check number of items
        chai.assert.equal(
            this.enrichedOrderItems.length,
            13,
            'different number of order items processed'
        );

        // RFS checks
        // check id and parent id
        chai.assert.equal(
            this.enrichedOrderItems[0].id,
            '5d4940a1-c03c-48d1-be6f-e36b76532ccd',
            'primary id does not match'
        );
        chai.assert.equal(
            this.enrichedOrderItems[0].itilClassName,
            'u_cmdb_ci_primary_managed_cpe_cfs',
            'generated class does not match'
        );
    });
});