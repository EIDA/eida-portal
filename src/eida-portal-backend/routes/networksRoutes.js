'use strict';
module.exports = function (app, ctx) {
  var netsController = require('../controllers/networksController');
  var statsController = require('../controllers/stationsController');
  var netsStatsController = require('../controllers/networksStationsController');
  var channelsController = require('../controllers/channelsController');

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

  app.route('/cha').get(
    channelsController.list_all_channels.bind(ctx)
  )
};