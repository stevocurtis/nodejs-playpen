var itilUtil = require("./itil-util");
var chai = require("chai");

describe("Itil Utility Tests", function() {
  it("should map tmf description to itil class", function() {
    chai.assert.isUndefined(
      itilUtil.convertTmfDescriptionToItilClass(undefined)
    );
    chai.assert.isUndefined(itilUtil.convertTmfDescriptionToItilClass(""));
    chai.assert.equal(
      itilUtil.convertTmfDescriptionToItilClass("something"),
      "itil_class_id_something"
    );
    chai.assert.equal(
      itilUtil.convertTmfDescriptionToItilClass("Something"),
      "itil_class_id_something"
    );
    chai.assert.equal(
      itilUtil.convertTmfDescriptionToItilClass("SOMETHING"),
      "itil_class_id_something"
    );
    chai.assert.equal(
      itilUtil.convertTmfDescriptionToItilClass("Something With Spaces"),
      "itil_class_id_something_with_spaces"
    );
    chai.assert.equal(
      itilUtil.convertTmfDescriptionToItilClass("SomeThinG WiTh sPacEs"),
      "itil_class_id_something_with_spaces"
    );
    chai.assert.equal(
      itilUtil.convertTmfDescriptionToItilClass("SOMETHING WITH SPACES"),
      "itil_class_id_something_with_spaces"
    );
  });
});
