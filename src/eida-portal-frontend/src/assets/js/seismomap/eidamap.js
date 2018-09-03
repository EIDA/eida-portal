/*
 * Function document.ready
 *
 * Calls initialization functions
 *
 */
$(document).ready(function () {

    // Create SeismoMap
    var seismoMap = new SeismoMap({

        /**
         * Customisations at creation time
         */

        // Custom stations URL/file
        dataStationsFDSNwsURL: 'http://rdsa.knmi.nl/fdsnws/station/1/query?level=station&format=text&network=NL',

    });

    /**
     * Actions that can be done after creating the map
     */

    // Reset zoom
    $('#smap-button-resetzoom').on('click', function () {
        seismoMap.resetZoom();
    });

    // Go to a specific place
    $('#smap-button-gotogro').on('click', function () {
        seismoMap.focusMap([6.8, 53.255]);
    });

});