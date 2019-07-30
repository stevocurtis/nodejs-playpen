const uuid4 = require('uuid/v4');

module.exports = {
    //
    // This function writes multiple inventory into inlfe system - stub to simulate a unique id back from inlife system
    //
    writeInlifeAssets: function(enhancedBssItems) {},

    //
    // This function writes single inventory into inlfe system
    //
    writeInlifeAsset: function(enhancedBssItem) {
        // do not care about the stub response as long as it has a unique id
        // TODO correct this format
        let response = {
            sys_id: uuid4()
        };
        return response;
    },

    //
    // This function writes single inventory relationship into inlfe system
    //
    writeInlifeAssetRelationship: function(enhancedBssItem) {}
}