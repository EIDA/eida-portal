var loki = require('lokijs');

module.exports = class DbMan {
    constructor() {
        this.db = new loki('epb-db.json');
    }

    initDb() {
        this.db.loadDatabase({}, function () {
            // Init networks collection
            this._initCol([
                'networks',
                'stations',
                'netstat'
            ])

            // Save the DB
            this.db.saveDatabase();
        }.bind(this));
    }

    _initCol(array) {
        for (let a of array) {
            var col = this.db.getCollection(a);
            if (!col) {
                col = this.db.addCollection(a);
            }
        }
    }

    loadCollection(colName, callback) {
        this.db.loadDatabase({}, function () {
            var _collection = this.getCollection(colName);
    
            if (!_collection) {
                console.log("Collection %s does not exit. Creating ...", colName);
                _collection = this.addCollection(colName);
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
