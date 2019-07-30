module.exports = {
    //
    // This function converts a TML description to an ITIL class
    //
    convertTmfDescriptionToItilClass: function(tmfDescription) {
        let itilClass = undefined;
        if (tmfDescription && tmfDescription.length > 0) {
            itilClass =
                this.itilPrepend + tmfDescription.replace(/\ /g, "_").toLowerCase();
        }
        return itilClass;
    },
    itilPrepend: "cmdb_ci_u_"
};