const DbMan = require('../db/dbMan');

exports.list_all_networks = function (req, res) {
    var dbMan = new DbMan();
    dbMan.loadCollection('networks', function(networks) {
        res.json(networks.data);
    });
};