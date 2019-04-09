var loki = require('lokijs');
var mem = new loki.LokiMemoryAdapter();
var adapter = new loki.LokiPartitioningAdapter(mem);
// var adapter = new loki.LokiFsAdapter('loki');

module.exports = class DbMan {
    constructor() {
        this.db = new loki(
            'epb-db.json',
            {
                autoload: true,
                autosave: true,
                autosaveInterval: 10000,
                adapter: adapter
            }
        );
    }

    initDb() {
        let cols = [
            'networks',
            'stations',
            'channels'
        ]

        for (let a of cols) {
            var c = this.db.getCollection(a);
            if (!c) {
                c = this.db.addCollection(a);
            }
        }
        // this.db.saveDatabase();
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
                // this.saveDatabase();
            }
    
            callback(_collection);
        }.bind(this.db));
    }

    clrCollection(name) {
        this.loadCollection(name, function(name, ctx){
            name.clear();
            // ctx.saveDatabase();
        });
    }
}
