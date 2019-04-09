var request = require('request');
var eida = require('../eida.json');
const DbMan = require('../db/dbMan');
var parseString = require('xml2js').parseString;

/**
 * Sync basic networks information.
 */
exports.sync_networks = function (err, ctx) {
    console.log(`Network sync started`);
    ctx.clrCollection('networks');

    for (let e of eida) {
        request(e.url_station + 'format=text&level=network', function (err, resp) {
            if (err) {
                console.log(err);
                return;
            }

            ctx.loadCollection('networks', function(networks) {
                processNetResp(networks, resp.body);
            });
        });
    }
};

function processNetResp(networks, body) {
    let lines = body.split('\n');
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

    // ctx.db.saveDatabase();
}

/**
 * Sync basic station information.
 */
exports.sync_stations = function (err, ctx) {
    ctx.clrCollection('stations');

    for (let e of eida) {
        let url = e.url_station + 'format=text&level=station';
        request(url, function (err, resp) {
            if (err) {
                console.log(err);
                return;
            }

            ctx.loadCollection('stations', function(stations) {
                processStatResp(stations, ctx, resp.body)
            });
        });
    }
}

function processStatResp(stations, ctx, body) {
    var lines = body.split('\n');

    if (lines.length < 10) return;

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
                
                // Make sure the end year is present and add it
                let _end = '';
                if (values[7]) {
                    _end = values[7].substr(0, 4)
                }

                let _station = {
                    'net': values[0],
                    'stat': values[1],
                    'lat': values[2],
                    'lon': values[3],
                    'elev': values[4],
                    'name': values[5],
                    'start': values[6].substr(0, 4),
                    'end': _end,
                    'cha': []
                }

                stations.insert(_station);

                // sync_station_channels(stations, _station);
            }
    }
}

/**
 * Sync station channels using FDSN routing service.
*/
function sync_station_channels(stations, station) {
    request(
        eida[0].url_routing + `network=${station.net}&station=${station.stat}`,
        function(err, resp) {
            if (err) {
                console.log(err);
                return;
            }

            processRouteResp(stations, station, resp);
        }
    );
}

function processRouteResp(stations, station, resp) {
    parseString(resp.body, function(err, result) {
        if (err) {
            console.log(err);
            return;
        }

        if (!result) {
            return;
        }

        let stationUrl = dataselectToStationUrl(
            result.service.datacenter[0].url[0]
        )
        syncStationChannels(stations, station, stationUrl);
    });
}

function syncStationChannels(stations, station, stationUrl) {
    let url = `${stationUrl}network=${station.net}&station=${station.stat}&level=channel`;

    request(url, function(err, resp) {
        if (err) {
            console.log(err);
            return;
        }

        parseString(resp.body, function(err, result) {
            // Nullcheck the parse result and make sure it has a FDSNStationXML
            if (!result || !result.FDSNStationXML) return;

            for (let ch of result.FDSNStationXML.Network[0].Station[0].Channel) {
                station.cha.push({
                    'code': ch['$'].code,
                    'location': ch['$'].locationCode,
                    'sample_rate': ch.SampleRate[0]
                })
            }

            stations.insert(station);
        });
    });
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