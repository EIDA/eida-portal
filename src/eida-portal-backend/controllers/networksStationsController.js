const DbMan = require('../db/dbMan');

exports.list_all_networks_stations = function (req, res) {
    var dbMan = new DbMan();
    var result = [];

    dbMan.loadDb(function(ctx) {
        nets = ctx.getCollection('networks');
        stats = ctx.getCollection('stations');
        for (let n of nets.data) {
            result.push({
                'code': n.code,
                'desc': n.desc,
                'start': n.start,
                'end': n.end,
                'stations': stats.data.filter(s => s.net == n.code)
            });
        }
        res.json(result);
    }.bind(dbMan))
};