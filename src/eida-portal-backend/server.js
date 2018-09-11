var express = require('express'),
    app = express(),
    port = process.env.PORT || 3000;
var async = require('async');
var cors = require('cors')
var CronJob = require('cron').CronJob;
var fdsn_worker = require('./fdsn/fdsn_worker')
var request = require('request');
var fs = require('fs');
var routes = require('./routes/networksRoutes');

app.use(cors());
routes(app);
app.use(function (req, res) {
    res.status(404).send({
        url: req.originalUrl + ' not found'
    });
});

var srv = app.listen(port, function() {
    var port = srv.address().port;
    console.log('EIDA Backend listening at http://127.0.0.1:%s', port);
});

// Harvest the FDSN data every 10 minutes
new CronJob('0 */10 * * * *', function () {
    const d = new Date();
    fdsn_worker.sync_networks(async, request, fs);
    fdsn_worker.sync_stations(async, request, fs);
}, null, true);