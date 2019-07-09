exports.list_all_networks = function (req, res) {
    this.loadCollection('networks', function(networks) {
        res.json(networks.data);
    });
};