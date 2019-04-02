const DbMan = require('../db/dbMan');

exports.list_all_networks = function (req, res) {
    var ctx = new DbMan().getDbCtx();
    ctx.loadDatabase({}, function() {
        let st = ctx.getCollection('networks').data;
        res.json(st);
    });
};