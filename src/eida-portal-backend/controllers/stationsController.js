const DbMan = require('../db/dbMan');

exports.list_all_stations = function (req, res) {
    var dbMan = new DbMan();
    dbMan.loadCollection('stations', function(stations) {
        res.json(stations.data);
    });
};