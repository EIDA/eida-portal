exports.list_all_networks = function (req, res) {
    const data = require('../networks.json');
    res.json(data);
};