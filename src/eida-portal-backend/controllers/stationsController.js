var request = require('request');
var parseString = require('xml2js').parseString;
var eida = require('../eida.json');
var helpers = require('../helpers/helpers');

exports.list_all_stations = function (req, res) {
    // In case the request contains query parameters, we can assume
    // the response station channel info is expected in the result.
    // The idea is pretty simple:
    // 1. Channel info is requested
    // 2. Query the routing service to get the right node
    // 3. Use the local cache (db.channels) to get channels info
    if (req.query.net && req.query.stat) {
        this.loadDb(function(ctx) {
            let sCol = ctx.getCollection('stations');
            let s = sCol.find({
                'net': req.query.net.toUpperCase(),
                'stat': req.query.stat.toUpperCase()
            });

            // Station not found
            if (!s || s.length <= 0) {
                res.json('nodata');
                return;
            }

            get_station_channel_info(ctx, res, s[0]);
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
function get_station_channel_info(ctx, res, station) {
    request(
        eida[0].url_routing + `network=${station.net}&station=${station.stat}`,
        function(err, resp) {
            if (err) {
                console.log(err);
                return;
            }

            process_route_resp(ctx, res, station, resp);
        }
    );
}

function process_route_resp(ctx, res, station, resp) {
    parseString(resp.body, function(err, result) {
        if (err) {
            console.log(err);
            return;
        }

        if (!result) {
            return;
        }

        let nodeCode = helpers.dataselect_url_to_node_code(
            result.service.datacenter[0].url[0]
        )
        add_station_channels(ctx, res, station, nodeCode);
    });
}

function add_station_channels(ctx, res, station, nodeCode) {
    let chCol = ctx.getCollection('channels');
    let ch = chCol.find({
        'node': nodeCode,
        'net': station.net,
        'stat': station.stat
    });

    station.cha = [];

    if (!ch || ch.length <= 0) {
        res.json(station);
        return;
    }

    for (let c of ch) {
        station.cha.push({
            'code': c.cha,
            'location': c.loc,
            'sample_rate': c.sampling
        })
    }

    res.json(station);
}