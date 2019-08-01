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
            "SE.ocishelf.CITIBANK-RIVERSIDE-WEST-CPE.48BF4FF5-7F000001-71ACC80D-D7CAB8AA",
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

        // Resource checks
        // check id and parent id
        chai.assert.equal(
            this.enrichedOrderItems[1].id,
            "SE.ipmipAddress.CPE_LRS_ipaddress.48BF4FFA-7F000001-71ACC80D-2AF7925D.48BF4FFA-7F000001-71ACC80D-0172F22C",
            "primary id does not match"
        );
        chai.assert.equal(
            this.enrichedOrderItems[1].parentId,
            "SE.ocishelf.CITIBANK-RIVERSIDE-WEST-CPE.48BF4FF5-7F000001-71ACC80D-D7CAB8AA",
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