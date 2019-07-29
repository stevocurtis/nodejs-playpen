module.exports = {
    getAssetProcessItems: function(payload) {
        let processedOrderItems = [];
        // console.log('getAsseprocessItems received raw', payload);
        // console.log('getAsseprocessItems received stringified', JSON.stringify(payload));

        // console.log(payload.Order);
        if (payload && payload.Order && payload.Order.orderItem) {
            payload.Order.orderItem.forEach(orderItem => {
                // console.log('found an order item', orderItem);
                console.log('~~~~~~~~~~~~~~~~~~~~~~~~~');
                processedOrderItems.push({
                    'orderItem': orderItem,
                    'id': getAncestordIdFromOrderItem(orderItem, 0),
                    'parentId': getAncestordIdFromOrderItem(orderItem, 1),
                    'type': getAssedTypeFromOrderItem(orderItem)
                })
            });
        } else {
            console.error('bss inventory does not contain and items');
        }
        console.log('processedOrderItems', processedOrderItems);
        return processedOrderItems;
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

function getAssedIdXpathFromOrderItem(orderItem) {
    primaryKeyXpath = orderItem.entity.entitySpecKey.primaryKey.value;
    console.log('found order item primary xpath key', primaryKeyXpath);
    xpathTokens = primaryKeyXpath.split('/');
    console.log('found order item xpathTokens', xpathTokens);
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