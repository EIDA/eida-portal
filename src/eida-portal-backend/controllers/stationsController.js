const DbMan = require('../db/dbMan');

exports.list_all_stations = function (req, res) {
    // In case the request contains query parameters, we can assume
    // the response station channel info is expected in the result
    if (Object.keys(req.query).length > 0) {
        res.json(req.query);
    } else {
        this.loadCollection('stations', function(stations) {
            res.json(stations.data);
        });
    }
};