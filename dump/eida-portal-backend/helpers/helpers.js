var eida = require('../eida.json');

exports.dataselect_url_to_node_code = function(dataselectUrl) {
    let baseUrl = dataselectUrl.split('/')[2];

    for (let e of eida) {
        if (e.url_base === baseUrl) {
            return e.code
        }
    }

    // If baseUrl cannot be found...
    // TODO: think how to handle this exception in a more suitable way
    console.log(
        `FDSN Station URL not found in EIDA definition file for: ${dataselectUrl}`
    )
}