var loki = require('lokijs');
var idbAdapter = new loki.LokiFsAdapter('loki');

module.exports = class DbMan {
    constructor() {
        this.db = new loki(
            'epb-db.json',
            {
                autoload: true,
                autoloadCallback: function() {
                    let cols = [
                        'networks',
                        'stations',
                        'netstat'
                    ]

                    for (let a of cols) {
                        var c = this.db.getCollection(a);
                        if (!c) {
                            c = this.db.addCollection(a);
                        }
                    }
                    this.db.saveDatabase();
                }.bind(this),
                autosave: true,
                autosaveInterval: 10000,
                adapter: idbAdapter
            }
        );
    }

    loadDb(callback) {
        this.db.loadDatabase({}, function() {
            callback(this);
        }.bind(this.db));
    }

    loadCollection(colName, callback) {
        this.db.loadDatabase({}, function () {
            var _collection = this.getCollection(colName);
    
            if (!_collection) {
                console.log("Collection %s does not exit. Creating ...", colName);
                _collection = this.addCollection(colName);
                this.saveDatabase();
            }
    
            callback(_collection, this);
        }.bind(this.db));
    }

    clrCollection(name) {
        this.loadCollection(name, function(name, ctx){
            name.clear();
            ctx.saveDatabase();
        });
    }
}
