var ossInventoryBroadcast = require("./oss-inventory-broadcast");
var chai = require("chai");
const fs = require("fs");

describe("OSS Inventory Broadcast Tests", function() {
    beforeEach(function() {
        let ossExampleInventoryBroadcastRaw = fs.readFileSync(
            "src/integration/oss/oss-inventory-broadcast-sample.json"
        );
        let ossExampleInventoryBroadcast = JSON.parse(
            ossExampleInventoryBroadcastRaw
        );

        this.enrichedOrderItems = ossInventoryBroadcast.parseAndEnrichOSSInventoryBroadcast(
            ossExampleInventoryBroadcast
        );
    });

    it("should parse order items", function() {
        // check number of items
        chai.assert.equal(
            this.enrichedOrderItems.length,
            2,
            "different number of order items processed"
        );

        // RFS checks
        // check id and parent id
        chai.assert.equal(
            this.enrichedOrderItems[0].id,
            "SE.ocishelf.CITIBANK-RIVERSIDE-WEST-CPE.4D6DCCA5-7F000001-71ACC80D-4194B10D",
            "primary id does not match"
        );
        chai.assert.isOk(
            this.enrichedOrderItems[0].parentId,
            "parent id does not match"
        );
        chai.assert.equal(
            this.enrichedOrderItems[0].type,
            "RFS",
            "type does not match"
        );

        // Resource checks
        // check id and parent id
        chai.assert.equal(
            this.enrichedOrderItems[1].id,
            "SE.ipmipAddress.CPE_LRS_ipaddress.4D6DCCAA-7F000001-71ACC80D-2E8EC840.4D6DCCAA-7F000001-71ACC80D-904CA15E",
            "primary id does not match"
        );
        chai.assert.equal(
            this.enrichedOrderItems[1].parentId,
            "SE.ocishelf.CITIBANK-RIVERSIDE-WEST-CPE.4D6DCCA5-7F000001-71ACC80D-4194B10D",
            "parent id does not match"
        );
        chai.assert.equal(
            this.enrichedOrderItems[1].type,
            "Resource",
            "type does not match"
        );
    });
});

it("should process enriched order items", function() {
    // process items
    // TODO work here this evening
    // ossInventoryBroadcast.writeEnrichedOSSInventoryItems(this.enrichedOrderItems);
});