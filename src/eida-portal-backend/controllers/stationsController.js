exports.list_all_stations = function (req, res) {
    const data = require('../stations.json');
    res.json(data);
};