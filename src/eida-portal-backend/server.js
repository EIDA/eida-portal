var express = require('express'),
    app = express(),
    port = process.env.PORT || 3000;
var cors = require('cors')
var CronJob = require('cron').CronJob;
var fdsn_worker = require('./fdsn/fdsn_worker')
var NWorker = require('./fdsn/networkWorker');
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

new CronJob('*/3 * * * * *', function () {
    console.log('EIDA Portal backend sync started');
    var nw = new NWorker();
    nw.getNetworks(request, fs);
    nw.mergeNetworks(fs);
    nw.saveNetworks(fs);
    // fdsn_worker.sync_networks(request, fs);
    // fdsn_worker.sync_stations(request, fs);
}, null, true);