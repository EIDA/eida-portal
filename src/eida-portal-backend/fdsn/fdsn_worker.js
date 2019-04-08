var request = require('request');
var eida = require('../eida.json');
const DbMan = require('../db/dbMan');
var parseString = require('xml2js').parseString;

/**
 * Sync basic networks information.
 */
exports.sync_networks = function (callback) {
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

    if (callback) callback();
};

/**
 * Sync basic station information.
 */
exports.sync_stations = function (callback) {
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
                                'stat': values[1]
                            }).length > 0) continue;

                            stations.insert({
                                'net': values[0],
                                'stat': values[1],
                                'lat': values[4],
                                'lon': values[5],
                                'elev': values[6],
                                'dep': values[7],
                                'name': `Network: ${values[0]}, Station ${values[1]}`,
                                'start': values[15].substr(0, 4),
                                'end': values[16].substr(0, 4),
                                'cha': []
                            });
                        }
                }

                ctx.saveDatabase();
            }.bind(resp));
        });
    }
    
    if (callback) callback();
}

/**
 * Sync station channels using FDSN routing service.
*/
exports.sync_stations_channels = function () {
    var db = new DbMan();
    db.loadCollection('stations', function(stations) {
        for (let e of stations.data) {
            request(eida[0].url_routing + `network=${e.net}&station=${e.stat}`, function(err, resp) {
                // Nullcheck the response
                if (!resp) return;

                parseString(resp.body, function(err, result) {
                    if (!result) return;

                    let stationUrl = dataselectToStationUrl(
                        result.service.datacenter[0].url[0]
                    )
                    syncStationChannels(e, stationUrl);
                });
            }.bind(e));
        }
    });
}

function syncStationChannels(station, stationUrl) {
    let url = `${stationUrl}network=${station.net}&station=${station.stat}&level=channel`;

    request(url, function(err, resp) {
        // Nullcheck the response
        if (!resp) return;

        parseString(resp.body, function(err, result) {
            // Nullcheck the parse result and make sure it has a FDSNStationXML
            if (!result || !result.FDSNStationXML) return;

            channelArray = [];

            for (let ch of result.FDSNStationXML.Network[0].Station[0].Channel) {
                channelArray.push({
                    'code': ch['$'].code,
                    'location': ch['$'].locationCode,
                    'sample_rate': ch.SampleRate[0]
                })
            }

            let dbMan = new DbMan();
            dbMan.loadCollection('stations', function(stations, ctx) {
                let s = stations.find({
                    'net': station.net,
                    'stat': station.stat,
                    'start': station.start
                })[0]

                if (!s) {
                    return;
                }
                
                s.cha = channelArray;
                ctx.saveDatabase();
            }.bind(channelArray));

        }.bind(station));
    }.bind(station));

}

function dataselectToStationUrl(dataselectUrl) {
    let baseUrl = dataselectUrl.split('/')[2];

    for (let e of eida) {
        if (e.url_base === baseUrl) {
            return e.url_station
        }
    }

    // If baseUrl cannot be found...
    // TODO: think how to handle this exception in a more suitable way
    console.log(
        `FDSN Station URL not found in EIDA definition file for: ${dataselectUrl}`
    )
}