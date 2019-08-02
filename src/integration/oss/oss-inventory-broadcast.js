var inlifeInventoryWrite = require("../inlife/inlife-inventory-write");
var itilUtil = require("../inlife/itil-util");
const uuid4 = require('uuid/v4');

module.exports = {
    //
    // This function parses the payload and stores useful data
    //
    parseAndEnrichOSSInventoryBroadcast: function(payload) {
        let enrichedOrderItems = [];

        if (payload && payload.provisioningOrderItems) {
            let provItemsCounterIndex = 0;
            payload.provisioningOrderItems.forEach(provisioningOrderItem => {
                if (
                    provisioningOrderItem &&
                    provisioningOrderItem.serviceGraph &&
                    provisioningOrderItem.serviceGraph.vertices
                ) {
                    let numVertices = provisioningOrderItem.serviceGraph.vertices.length;
                    if (numVertices > 0) {
                        // push first vertex out as RFS asset
                        enrichedOrderItems.push({
                            orderItem: provisioningOrderItem.serviceGraph.vertices[0],
                            id: provisioningOrderItem.serviceGraph.vertices[0].graphId,
                            parentId: getParentId(payload, provItemsCounterIndex),
                            type: "RFS",
                            class: itilUtil.ossRFSClass
                        });
                    }
                    if (numVertices > 1) {
                        // push rest of these are resource assets
                        let vCounter = 1;
                        for (; vCounter < numVertices; vCounter++)
                            enrichedOrderItems.push({
                                orderItem: provisioningOrderItem.serviceGraph.vertices[vCounter],
                                id: provisioningOrderItem.serviceGraph.vertices[vCounter].graphId,
                                parentId: provisioningOrderItem.serviceGraph.vertices[0].graphId,
                                type: "Resource",
                                class: itilUtil.ossResourceClass
                            });
                    }
                }
                provItemsCounterIndex++; // increment so can find the correct parent cfs name
            });
        } else {
            console.error("oss inventory does not contain any items");
        }
        console.log("enrichedOrderItems", enrichedOrderItems);
        return enrichedOrderItems;
    }
};

function getParentId(payload, index) {

    let parentId = undefined;
    let parentInlifeClass = getParentCfsInlifeClass(payload, index);
    if (parentInlifeClass) {
        parentId = uuid4();
    }
    console.log('parentId is', parentId);
    return parentId;
}

function getParentCfsInlifeClass(payload, index) {

    let inlifeClass = undefined;
    if (payload && payload.relations && payload.relations.length > index - 1) {
        relation = payload.relations[index];
        if (relation && relation.cfsProductName) {
            inlifeClass = itilUtil.convertTmfDescriptionToItilClass(relation.cfsProductName);

        }
    }
    console.log('inlifeClass is', inlifeClass);
    return inlifeClass;
}