var inlifeChangeRequest = require("./inlife-change-request");
var chai = require("chai");
const fs = require("fs");

describe("Inlife Change Request Tests", function() {
    beforeEach(function() {
        let inlifeExampleChangeRequestRaw = fs.readFileSync(
            "src/integration/inlife/inlife-change-request-sample.json"
        );
        let inlifeExampleChangeRequest = JSON.parse(
            inlifeExampleChangeRequestRaw
        );

        this.enrichedOrderItems = inlifeChangeRequest.parseAndEnrichInlifeChangeRequest(inlifeExampleChangeRequest);
    });

    it("should parse order items", function() {
        // check number of items
        chai.assert.equal(
            this.enrichedOrderItems.length,
            1,
            "different number of order items processed"
        );

        // check id
        chai.assert.equal(
            this.enrichedOrderItems[0].id,
            "FWRC1",
            "ids do not match"
        );
    });
});