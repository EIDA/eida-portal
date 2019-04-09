const DbMan = require('../db/dbMan');

exports.list_all_stations = function (req, res) {
    this.loadCollection('stations', function(stations) {
        res.json(stations.data);
    });
};