var inlifeInventoryWrite = require("../inlife/inlife-inventory-write");
var itilUtil = require("../inlife/itil-util");
const uuid4 = require('uuid/v4');

module.exports = {
    //
    // This function parses the payload and stores useful data
    //
    parseAndEnrichOSSInventoryBroadcast: function(payload) {
        let enrichedOrderItems = [];

        // console.log('received payload', payload);

        if (payload && payload.items) {
            payload.items.forEach(item => {
                item.itilClassName = mapClassName(item);
                enrichedOrderItems.push(item);
                console.log('found item', item);
            });
        } else {
            console.error("oss inventory does not contain any items");
        }
        console.log("found", enrichedOrderItems.length, "item(s)");
        return enrichedOrderItems;
    }
};

function mapClassName(item) {

    let className = "unknown";
    if (item && item.name) {
        if (item.name.endsWith("CFS")) {
            className = itilUtil.convertTmfDescriptionToItilClass(item.name);
        } else if (item.name.endsWith("RFS")) {
            className = itilUtil.ossRFSClass;
        } else {
            className = itilUtil.ossResourceClass;
        }
    }
    return className;
}