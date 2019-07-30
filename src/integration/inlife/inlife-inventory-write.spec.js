var inlifeInventoryWrite = require('./inlife-inventory-write');
var chai = require('chai');

describe('Inlife Inventory Tests', function() {

    it('asset write should generate a response with random sys_id', function() {
        let assetWriteResponse = inlifeInventoryWrite.writeInlifeAsset();
        chai.assert.isOk(assetWriteResponse.sys_id);
        chai.assert.isTrue(assetWriteResponse.sys_id.length > 0);
    });
});