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
    // This function parses the payload and stores useful data
    //
    writeEnrichedBSSInventoryItems: function(enrichedBssOrderItems) {

        // simulate the inlife asset writes
        enrichedBssOrderItems.forEach(function(enrichedBssOrderItem) {

            inlifeAssetWriteResponse = inlifeInventoryWrite.writeInlifeAsset(enrichedBssOrderItem);
            // enrich the bss asset further with the inlife id
            if (inlifeAssetWriteResponse && inlifeAssetWriteResponse.sys_id) {
                console.log('adding inlife service id', inlifeAssetWriteResponse.sys_id, 'to bss id', enrichedBssOrderItem.id);
                enrichedBssOrderItem.inlifeId = inlifeAssetWriteResponse.sys_id;
            }
        });

        // simulate the inlife asset relationship writes
        enrichedBssOrderItems.forEach(function(enrichedBssOrderItem) {

            parent = getParentEnrichedItem(this.enrichedBssOrderItems, enrichedBssOrderItem.parentId);
            console.log('#####################', parent);
            if (parent) {
                console.log('build relationship between item id', enrichedBssOrderItem.id, 'with type', enrichedBssOrderItem.type, 'and parent id', parent.id, 'with type', parent.type);
            }
        });
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

function getParentEnrichedItem(items, parentId) {
    let parent = undefined;
    if (parentId && items) {
        items.forEach(item => {
            if (item && parentId === item.id) {
                parent = item;
                break;
            }
        })
    }
    console.log('parent id', parentId, 'found item', parent);
    return parent;
}