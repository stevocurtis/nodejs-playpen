var inlifeInventoryWrite = require('../inlife/inlife-inventory-write');

module.exports = {
    //
    // This function parses the payload and stores useful data
    //
    parseAndEnrichBSSInventoryBroadcast: function(payload) {
        let enrichedOrderItems = [];

        if (payload && payload.Order && payload.Order.orderItem) {
            payload.Order.orderItem.forEach(orderItem => {
                // console.log('found an order item', orderItem);
                enrichedOrderItems.push({
                    'orderItem': orderItem,
                    'id': getAncestordIdFromOrderItem(orderItem, 0),
                    'parentId': getAncestordIdFromOrderItem(orderItem, 1),
                    'type': getAssedTypeFromOrderItem(orderItem)
                        // TODO - if need sibling relationships then will need to record hierarchy depth as well
                })
            });
        } else {
            console.error('bss inventory does not contain any items');
        }
        console.log('enrichedOrderItems', enrichedOrderItems);
        return enrichedOrderItems;
    },

    //
    // This function simulates the work to update inlife inventory
    //
    writeInlifeInventory: function(enrichedBssItems) {
        inlifeInventoryWrite.createInlifeAsset(enrichedBssItems)
    }
}

function getAssedTypeFromOrderItem(orderItem) {
    let type = undefined;
    try {
        type = orderItem.entity.entitySpecKey.type;
    } catch (error) {
        console.error('error parsing type', error);
    }
    console.log('returning type', type);
    return type;
}

function getAncestordIdFromOrderItem(orderItem, ancestorLevel) {
    let id = undefined;
    try {
        primaryKeyXpath = orderItem.entity.entitySpecKey.primaryKey.value;
        console.log('found order item primary xpath key', primaryKeyXpath);
        xpathTokens = primaryKeyXpath.split('/');
        // if (xpathTokens && xpathTokens.lo)
        console.log('found order item xpathTokens', xpathTokens);
        console.log('found', xpathTokens.length, 'order item xpathTokens');
        id = xpathTokens[xpathTokens.length - (ancestorLevel + 1)];
    } catch (error) {
        console.error('error parsing id', error);
    }
    console.log('returning ancestor id', id);
    return id;
}