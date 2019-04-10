var request = require('request');
var parseString = require('xml2js').parseString;
var eida = require('../eida.json');

exports.list_all_stations = function (req, res) {
    // In case the request contains query parameters, we can assume
    // the response station channel info is expected in the result
    if (req.query.net && req.query.stat) {
        this.loadCollection('stations', function(stations) {
            let s = stations.find({
                'net': req.query.net.toUpperCase(),
                'stat': req.query.stat.toUpperCase()
            });

            // Station not found
            if (!s || s.length <= 0) {
                res.json('nodata');
                return;
            }

            get_station_channel_info(res, s[0]);
        });
    } else if (req.query.net) {
        this.loadCollection('stations', function(stations) {
            let result = stations.find({
                'net': req.query.net.toUpperCase()
            });
            res.json(result);
        });
    } else {
        this.loadCollection('stations', function(stations) {
            res.json(stations.data);
        });
    }
};

/**
 * Sync station channels using FDSN routing service.
*/
function get_station_channel_info(res, station) {
    request(
        eida[0].url_routing + `network=${station.net}&station=${station.stat}`,
        function(err, resp) {
            if (err) {
                console.log(err);
                return;
            }

            process_route_resp(res, station, resp);
        }
    );
}

function process_route_resp(res, station, resp) {
    parseString(resp.body, function(err, result) {
        if (err) {
            console.log(err);
            return;
        }

        if (!result) {
            return;
        }

        let stationUrl = dataselect_to_station_url(
            result.service.datacenter[0].url[0]
        )
        sync_station_channels(res, station, stationUrl);
    });
}

function sync_station_channels(res, station, stationUrl) {
    let url = `${stationUrl}network=${station.net}&station=${station.stat}&level=channel`;

    request(url, function(err, resp) {
        if (err) {
            console.log(err);
            return;
        }

        parseString(resp.body, function(err, result) {
            // Nullcheck the parse result and make sure it has a FDSNStationXML
            if (!result || !result.FDSNStationXML) return;

            station.cha = [];

            for (let ch of result.FDSNStationXML.Network[0].Station[0].Channel) {
                station.cha.push({
                    'code': ch['$'].code,
                    'location': ch['$'].locationCode,
                    'sample_rate': ch.SampleRate[0]
                })
            }

            res.json(station);
        });
    });
}

function dataselect_to_station_url(dataselectUrl) {
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