var express = require('express'),
    app = express(),
    port = process.env.PORT || 3000;
var cors = require('cors')
var CronJob = require('cron').CronJob;
var fdsn_worker = require('./fdsn/fdsn_worker')
var routes = require('./routes/networksRoutes');
const DbMan = require('./db/dbMan');

this.dbMan = new DbMan();
// this.dbMan.initDb();

app.use(cors());
routes(app, this.dbMan);
app.use(function (req, res) {
    res.status(404).send({
        url: req.originalUrl + ' not found'
    });
});

var srv = app.listen(port, function() {
    var port = srv.address().port;
    console.log('EIDA Backend listening at http://127.0.0.1:%s', port);
});


// Sync on startup...
fdsn_worker.sync_networks(null, this.dbMan);
fdsn_worker.sync_stations(null, this.dbMan);
fdsn_worker.sync_stations_channels(null, this.dbMan);

// ...and every now and then
new CronJob('0 */12 * * *', function () {
    fdsn_worker.sync_networks(null, this.dbMan);
    fdsn_worker.sync_stations(null, this.dbMan);
    fdsn_worker.sync_stations_channels(null, this.dbMan);
}.bind(this), null, true);