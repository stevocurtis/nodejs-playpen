var inlifeInventoryWrite = require('../inlife/inlife-inventory-write');

module.exports = {
    //
    // This function parses the payload and stores useful data
    //
    parseAndEnrichBSSCatalogBroadcast: function(payload) {
        // console.log('received catalog payload', JSON.stringify(payload, undefined, '\t'));
        let numberRootProductOfferings = 0;
        if (payload && payload.Root && payload.Root.Bundle && payload.Root.Bundle.Product_To_Product) {
            numberRootProductOfferings = payload.Root.Bundle.Product_To_Product.length;
            console.log('received', numberRootProductOfferings, 'root product offerings');
        } else {
            console.log('no root product offerings received');
        }
        return numberRootProductOfferings;
    }
}