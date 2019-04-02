var loki = require('lokijs');

module.exports = class DbMan {

    constructor() { }

    initDb() {
        var db = new loki('epb-db.json', {
            autoload: true,
            autosave: true,
            autoloadCallback: dbInit,
        });
        
        function dbInit() {
            // Init networks collection
            initCol([
                'networks',
            ])
    
            // Save the DB
            db.saveDatabase();
        }
    
        function initCol(array) {
            for (let a of array) {
                var col = db.getCollection(a);
                if (!col) {
                    col = db.addCollection(a);
                }
            }
        }
    }

    getDbCtx() {
        var ctx = new loki('epb-db.json', {
            autoload: true,
            autosave: true,
            autosaveInterval: 1000
        });
    
        return ctx;
    }

    clrCollection(name) {
        let ctx = this.getDbCtx();
        ctx.loadDatabase({}, function() {
            let r = ctx.getCollection(name);
            r.clear();
        })
    }
}
