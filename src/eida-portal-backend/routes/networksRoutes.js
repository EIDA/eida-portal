'use strict';
module.exports = function (app) {
  var netsController = require('../controllers/networksController');
  var statsController = require('../controllers/stationsController');
  var netsStatsController = require('../controllers/networksStationsController')

  app.all(function (req, res, next) {
    // Enable CORS headers and proceed to the next middleware
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    next();
  });

  app.route('/n')
    .get(netsController.list_all_networks);

  app.route('/s')
    .get(statsController.list_all_stations);

  app.route('/ns')
    .get(netsStatsController.list_all_networks_stations);
};