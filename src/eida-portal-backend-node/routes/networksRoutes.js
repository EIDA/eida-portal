'use strict';
module.exports = function (app, ctx) {
  var netsController = require('../controllers/networksController');
  var statsController = require('../controllers/stationsController');
  var netsStatsController = require('../controllers/networksStationsController');
  var streamsController = require('../controllers/streamsController');

  app.all(function (req, res, next) {
    // Enable CORS headers and proceed to the next middleware
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    next();
  });

  app.route('/n').get(
    netsController.list_all_networks.bind(ctx)
  );

  app.route('/s').get(
    statsController.list_all_stations.bind(ctx)
  );

  app.route('/ns').get(
    netsStatsController.list_all_networks_stations.bind(ctx)
  );

  app.route('/streams').get(
    streamsController.list_all_streams.bind(ctx)
  );

  app.route('/streams').post(function(req, res) {
    streamsController.get_streams_for_stations(req, res, ctx);
  });
};