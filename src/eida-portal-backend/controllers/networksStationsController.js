exports.list_all_networks_stations = function (req, res) {
    var networks = require('../networks.json');
    var stations = require('../stations.json');
    var result = [];

    for (let n of networks) {
        result.push({
            'code': n.code,
            'desc': n.desc,
            'start': n.start,
            'end': n.end,
            'stations': stations.filter(s => s.net == n.code)
        });
    }
    res.json(result);
};