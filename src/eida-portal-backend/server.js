var express = require('express'),
    app = express(),
    port = process.env.PORT || 3000;
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

new CronJob('* * * * * *', function () {
    console.log('EIDA Portal backend sync started');
    fdsn_worker.sync_networks(request, fs);
    fdsn_worker.sync_stations(request, fs);
}, null, true);