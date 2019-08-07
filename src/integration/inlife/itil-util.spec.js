var itilUtil = require('./itil-util');
var chai = require('chai');

describe('Itil Utility Tests', function() {
    it('should map tmf description to itil class', function() {
        chai.assert.isUndefined(
            itilUtil.convertTmfDescriptionToItilClass(undefined)
        );
        chai.assert.isUndefined(itilUtil.convertTmfDescriptionToItilClass(''));
        chai.assert.equal(
            itilUtil.convertTmfDescriptionToItilClass('something'),
            itilUtil.itilPrepend + 'something'
        );
        chai.assert.equal(
            itilUtil.convertTmfDescriptionToItilClass('Something'),
            itilUtil.itilPrepend + 'something'
        );
        chai.assert.equal(
            itilUtil.convertTmfDescriptionToItilClass('SOMETHING'),
            itilUtil.itilPrepend + 'something'
        );
        chai.assert.equal(
            itilUtil.convertTmfDescriptionToItilClass('Something With Spaces'),
            itilUtil.itilPrepend + 'something_with_spaces'
        );
        chai.assert.equal(
            itilUtil.convertTmfDescriptionToItilClass('SomeThinG WiTh sPacEs'),
            itilUtil.itilPrepend + 'something_with_spaces'
        );
        chai.assert.equal(
            itilUtil.convertTmfDescriptionToItilClass('SOMETHING WITH SPACES'),
            itilUtil.itilPrepend + 'something_with_spaces'
        );
    });
});