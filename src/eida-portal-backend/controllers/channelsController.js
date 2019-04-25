var request = require('request');
var parseString = require('xml2js').parseString;
var eida = require('../eida.json');
var helpers = require('../helpers/helpers');

exports.get_channels_for_stations = function(req, res, ctx) {
    ctx.loadCollection('channels', function(channels) {
        let data = req.body;
        let temp = [];

        for (let d of data) {
            // For each station - get the array of its channels
            let chaArr = channels.find({
                'net': d.net,
                'stat': d.stat
            });

            // Add each channel to the channels array
            if (chaArr.length > 0) {
                for (c of chaArr) {
                    temp.push(c.cha.substring(0, 2));
                }
            }
        }

        // Create response object from the channels array
        if (temp.length > 0) {
            let result = createChannelArray(temp);
            res.json(result);
            return;
        } else {
            res.json('nodata');
            return;
        }
    });
}

exports.list_all_channels = function (req, res) {
    if (req.query.net && req.query.stat && req.query.level) {
        this.loadCollection('channels', function(channels) {
            let temp = [];
            for (let c of channels.find({
                'net': req.query.net.toUpperCase(),
                'stat': req.query.stat.toUpperCase()
            })) {
                let cha = c.cha.substring(0, 2);
                temp.push(cha);
            }

            let result = createChannelArray(temp);
            res.json(result);
            return;
        });
    } else if (req.query.net && req.query.level) {
        this.loadCollection('channels', function(channels) {
            let temp = [];
            for (let c of channels.find({
                'net': req.query.net.toUpperCase()
            })) {
                let cha = c.cha.substring(0, 2);
                temp.push(cha);
            }

            let result = createChannelArray(temp);
            res.json(result);
            return;
        });
    } else if (req.query.level) {
        this.loadCollection('channels', function(channels) {
            let temp = [];
            for (let c of channels.data) {
                let cha = c.cha.substring(0, 2);
                temp.push(cha);
            }

            let result = createChannelArray(temp);
            res.json(result);
            return;
        });
    } else if (req.query.net && req.query.stat) {
        let ctx = this;
        request(
            eida[0].url_routing 
            + `network=${req.query.net.toUpperCase()}`
            + `&station=${req.query.stat.toUpperCase()}`,
            function(err, resp) {
                if (err) {
                    console.log(err);
                    return;
                }
    
                process_route_resp(ctx, resp, res);
            }
        );
    } else if (req.query.net) {
        let ctx = this;
        request(
            eida[0].url_routing + `network=${req.query.net.toUpperCase()}`,
            function(err, resp) {
                if (err) {
                    console.log(err);
                    return;
                }
    
                process_route_resp(ctx, resp, res);
            }
        );
    } else {
        // In case there is no request query
        this.loadCollection('channels', function(channels) {
            res.json(channels.data);
            return;
        });
    }
};

function process_route_resp(ctx, resp, res) {
    parseString(resp.body, function(err, result) {
        if (err) {
            console.log(err);
            return;
        }

        if (!result) {
            return;
        }
        
        ctx.loadDb(function(ctx) {
            response = [];
            let stations = ctx.getCollection('stations');
            let channels = ctx.getCollection('channels');

            for (let dc of result.service.datacenter) {
                let node = helpers.dataselect_url_to_node_code(
                    dc.url[0]
                );

                for (let s of dc.params) {
                    if (s.sta[0] === '*') {
                        for (let st of stations.find({
                            'net': s.net[0]
                        })) {
                            let cha = [];
                            for (let c of channels.find({
                                'node': node,
                                'net': st.net,
                                'stat': st.stat
                            })) {
                                cha.push({
                                    'cha': c.cha,
                                    'sampling': c.sampling
                                })
                            }

                            response.push({
                                'net': st.net,
                                'sta': st.stat,
                                'cha': cha
                            });
                        }
                    } else {
                        let cha = [];
                        for (let c of channels.find({
                            'node': node,
                            'net': s.net[0],
                            'stat': s.sta[0]
                        })) {
                            cha.push({
                                'cha': c.cha,
                                'sampling': c.sampling
                            })
                        }
    
                        response.push({
                            'net': s.net[0],
                            'sta': s.sta[0],
                            'cha': cha
                        });
                    }
                }
            }

            res.json(response);
            return;
        });
    });
}

/**
 * Get the array of channel codes and, group them by name and add count
 * @param {string[]} array - Array of channel codes.
 */
function createChannelArray(array) {
    var result = {};
    array.map(function (a) {
        if (a in result) result[a] ++; else result[a] = 1;
    })
    return result;
}
