var EpcTranslator = require('./epc-translator');
var chai = require('chai');

describe('EPC Translator Tests', function() {

    beforeEach(function() {
        this.epcTranslator = new EpcTranslator();
    });

    it('should be truthy', function() {
        chai.assert.isOk(this.epcTranslator);
    });

    it('test method should be truthy', function() {
        chai.assert.isOk(this.epcTranslator.testMethod());
    });
});