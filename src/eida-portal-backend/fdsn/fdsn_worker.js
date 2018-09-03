var eida = require('../eida.json');

exports.sync_networks = function (request, fs) {
    var networks = [];
    for (let e of eida) {
        request(e.url_station + 'format=text&level=network', function (err, resp) {
            var lines = resp.body.split('\n');
            for (var i = 1; i < lines.length; i++) {
                var values = lines[i].split('|');
                if (values[0] &&
                    values[1] &&
                    values[2])
                    networks.push({
                        'code': values[0],
                        'desc': values[1],
                        'start': values[2].substr(0,4),
                        'end': values[3].substr(0,4),
                        'stations': []
                    });
            }
            fs.writeFile(
                'networks.json',
                JSON.stringify(networks),
                function (err) {
                    if (err) throw err;
                });
        })
    }
};

exports.sync_stations = function (request, fs) {
    var stations = [];
    for (let e of eida) {
        request(e.url_station + 'format=text&level=station', function (err, resp) {
            var lines = resp.body.split('\n');
            for (var i = 1; i < lines.length; i++) {
                var values = lines[i].split('|');
                if (values[0] &&
                    values[1] &&
                    values[2] &&
                    values[3] &&
                    values[4] &&
                    values[5] &&
                    values[6])
                    stations.push({
                        'net': values[0],
                        'stat': values[1],
                        'lat': values[2],
                        'lon': values[3],
                        'elev': values[4],
                        'name': values[5],
                        'start': values[6].substr(0,4),
                        'end': values[7].substr(0,4)
                    });
            }
            fs.writeFile(
                'stations.json',
                JSON.stringify(stations),
                function (err) {
                    if (err) throw err;
            });
        })
    }
};