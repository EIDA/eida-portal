var eida = require('../eida.json');

module.exports = class NetworkWorker {
    constructor(fs) {
        this.networks = new Array();
    };

    getNetworks(req, fs) {
        for (let e of eida) {
            req.get(e.url_station + 'format=text&level=network', function (err, resp) {
                fs.writeFile(
                    `./rawdata/${e.code}`,
                    resp.body,
                    function (err) {
                        if (err) throw err;
                    });
            })
        }
    }

    mergeNetworks(fs) {
        fs.readdir('./rawdata/', (err, files) => {
            files.forEach(file => {
                var data = fs.readFileSync(`./rawdata/${file}`, 'utf8');
                var lines = data.split('\n');
                for (var i = 1; i < lines.length; i++) {
                    var values = lines[i].split('|');
                    if (values[0] &&
                        values[1] &&
                        values[2]) {
                        this.networks.push({
                            'code': values[0],
                            'desc': values[1],
                            'start': values[2].substr(0, 4),
                            'end': values[3].substr(0, 4),
                            'stations': []
                        });
                    }
                }
            });
        });
        console.log(this.networks);
    }

    saveNetworks(fs) {
        fs.writeFile(
            'networks.json',
            JSON.stringify(this.networks),
            function (err) {
                if (err) throw err;
            });
    }
}