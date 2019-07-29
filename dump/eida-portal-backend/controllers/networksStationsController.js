exports.list_all_networks_stations = function (req, res) {
    var result = [];

    this.loadDb(function(ctx) {
        nets = ctx.getCollection('networks');
        stats = ctx.getCollection('stations');
        
        if (!(nets && stats)) {
            res.json([]);
        } else {
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
        }
    });
};