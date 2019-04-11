var request = require('request');
var parseString = require('xml2js').parseString;
var eida = require('../eida.json');
var helpers = require('../helpers/helpers');

exports.list_all_channels = function (req, res) {
    if (req.query.net && req.query.stat) {
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
