var inlifeInventoryWrite = require("../inlife/inlife-inventory-write");
var itilUtil = require("../inlife/itil-util");

module.exports = {
    //
    // This function parses the payload and stores useful data
    //
    parseAndEnrichOSSInventoryBroadcast: function(payload) {
        let enrichedOrderItems = [];

        if (payload && payload.provisioningOrderItems) {
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
                            parentId: undefined, // TODO fix this properly
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
            });
        } else {
            console.error("oss inventory does not contain any items");
        }
        console.log("enrichedOrderItems", enrichedOrderItems);
        return enrichedOrderItems;
    }
};