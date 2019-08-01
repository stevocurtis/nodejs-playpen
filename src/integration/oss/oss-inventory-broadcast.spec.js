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
            1,
            "different number of order items processed"
        );
        // check id and parent id
        chai.assert.equal(
            this.enrichedOrderItems[0].id,
            "SC.BT-SDW-POC2RFS_CPE.RFS_CPE_CITIBANK_RIVERSIDE.4C861D1A-7F000001-71ACC80D-381E2604",
            "primary id does not match"
        );
        // chai.assert.equal(
        //   this.enrichedOrderItems[0].parentId,
        //   "de39707b-d775-46a5-b61a-e501fac0e6f9",
        //   "parent id does not match"
        // );
        chai.assert.equal(
            this.enrichedOrderItems[0].type,
            "RFS",
            "type does not match"
        );
    });

    it("should process enriched order items", function() {
        // process items
        // TODO work here this evening
        // ossInventoryBroadcast.writeEnrichedOSSInventoryItems(this.enrichedOrderItems);
    });
});