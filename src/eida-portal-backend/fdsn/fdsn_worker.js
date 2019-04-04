var eida = require('../eida.json');
const DbMan = require('../db/dbMan');

exports.sync_networks = function (request) {
    var db = new DbMan();
    db.clrCollection('networks');

    for (let e of eida) {
        request(e.url_station + 'format=text&level=network', function (err, resp) {
            // Nullcheck the response
            if (!resp) return;

            var dbMan = new DbMan();
            dbMan.loadCollection('networks', function(networks, ctx){
                let lines = this.body.split('\n');
                for (let i = 1; i < lines.length; i++) {
                    let values = lines[i].split('|');
    
                    if (values[0] &&
                        values[1] &&
                        values[2]) {
                            // Check if network has been already added
                            if (networks.find({
                                'code': values[0],
                                'start': values[2].substr(0, 4)
                            }).length > 0) continue;
                            
                            networks.insert({
                            'code': values[0],
                            'desc': values[1],
                            'start': values[2].substr(0, 4),
                            'end': values[3].substr(0, 4)
                        }); 
                        }
                        
                }

                ctx.saveDatabase();
            }.bind(resp));
        });
    }
};

exports.sync_stations = function (request) {
    var db = new DbMan();
    db.clrCollection('stations');

    for (let e of eida) {
        request(e.url_station + 'format=text&level=channel', function (err, resp) {
            // Nullcheck the response
            if (!resp) return;

            var dbMan = new DbMan();
            dbMan.loadCollection('stations', function(stations, ctx) {
                var lines = this.body.split('\n');

                for (var i = 1; i < lines.length; i++) {
                    var values = lines[i].split('|');
                    if (values[0] &&
                        values[1] &&
                        values[2] &&
                        values[3] &&
                        values[4] &&
                        values[5] &&
                        values[6]) {
                            // Check if station has been already added
                            if (stations.find({
                                'net': values[0],
                                'stat': values[1],
                                'loc': values[2],
                                'cha': values[3]
                            }).length > 0) continue;

                            // #Network|Station|Location|Channel|Latitude|Longitude|Elevation|Depth|Azimuth|Dip|SensorDescription|Scale|ScaleFreq|ScaleUnits|SampleRate|StartTime|EndTime
                            stations.insert({
                                'net': values[0],
                                'stat': values[1],
                                'loc': values[2],
                                'cha': values[3],
                                'lat': values[4],
                                'lon': values[5],
                                'elev': values[6],
                                'dep': values[7],
                                'name': `Network: ${values[0]}, Station ${values[1]}`,
                                'start': values[15].substr(0, 4),
                                'end': values[16].substr(0, 4)
                            });
                        }
                }

                ctx.saveDatabase();
            }.bind(resp));
        });

    }
}

// exports.sync_networks = function (async, request, fs) {
//     let networks = [];
//     async.forEachOf(eida, (value, key, callback) => {
//         request(value.url_station + 'format=text&level=network', function (err, resp) {
//             let lines = resp.body.split('\n');
//             for (let i = 1; i < lines.length; i++) {
//                 let values = lines[i].split('|');
//                 if (values[0] &&
//                     values[1] &&
//                     values[2])
//                     networks.push({
//                         'code': values[0],
//                         'desc': values[1],
//                         'start': values[2].substr(0, 4),
//                         'end': values[3].substr(0, 4),
//                         'stations': []
//                     });
//             }
//             callback();
//         })
//     }, err => {
//         if (err) console.error(err.message);
//         fs.writeFile(
//             'networks.json',
//             JSON.stringify(networks),
//             function (err) {
//                 if (err) throw err;
//             });
//     });
// };

// exports.sync_stations = function (async, request, fs) {
//     var stations = [];
//     async.forEachOf(eida, (value, key, callback) => {
//         request(value.url_station + 'format=xml&level=channel', function (err, resp) {
//             var lines = resp.body.split('\n');
//             for (var i = 1; i < lines.length; i++) {
//                 var values = lines[i].split('|');
//                 if (values[0] &&
//                     values[1] &&
//                     values[2] &&
//                     values[3] &&
//                     values[4] &&
//                     values[5] &&
//                     values[6])
//                     stations.push({
//                         'net': values[0],
//                         'stat': values[1],
//                         'lat': values[2],
//                         'lon': values[3],
//                         'elev': values[4],
//                         'name': values[5],
//                         'start': values[6].substr(0, 4),
//                         'end': values[7].substr(0, 4)
//                     });
//             }
//             callback();
//         })
//     }, err => {
//         if (err) console.error(err.message);
//         fs.writeFile(
//             'stations.json',
//             JSON.stringify(stations),
//             function (err) {
//                 if (err) throw err;
//             });
//     });
// }