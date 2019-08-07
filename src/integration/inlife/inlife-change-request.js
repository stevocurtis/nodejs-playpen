module.exports = {
    //
    // This function parses the payload and stores useful data
    //
    parseAndEnrichInlifeChangeRequest: function(payload) {
        let enrichedOrderItems = [];

        // console.log('received payload', payload);

        if (payload && payload.orderItem) {
            payload.orderItem.forEach(item => {
                enrichedOrderItems.push(item);
                console.log('found item', item);
            });
        } else {
            console.error('inlife change request does not contain any items');
        }
        console.log('found', enrichedOrderItems.length, 'item(s)');
        return enrichedOrderItems;
    }
};