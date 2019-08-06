var bssCatalogBroadcast = require('./bss-catalog-broadcast');
var chai = require('chai');
const fs = require('fs');

describe('BSS Catalog Broadcast Tests', function() {

    beforeEach(function() {
        let bssExampleCatalogBroadcastRaw = fs.readFileSync('src/integration/bss/bss-catalog-broadcast-sample.json');
        let bssExampleCatalogBroadcast = JSON.parse(bssExampleCatalogBroadcastRaw);

        this.numberOfRootOfferings = bssCatalogBroadcast.parseAndEnrichBSSCatalogBroadcast(bssExampleCatalogBroadcast);
    });

    it('should parse items', function() {
        // check number of items
        chai.assert.isOk(this.numberOfRootOfferings > 0);
    });
});