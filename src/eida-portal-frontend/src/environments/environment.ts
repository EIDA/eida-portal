// This file can be replaced during build by using the `fileReplacements` array.
// `ng build ---prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  // networksUrl: 'http://127.0.0.1:5000/n',
  // stationsUrl: 'http://127.0.0.1:5000/s',
  // channelsUrl: 'http://127.0.0.1:5000/c',
  networksUrl: 'https://www.orfeus-eu.org/epb/n',
  stationsUrl: 'https://www.orfeus-eu.org/epb/s',
  channelsUrl: 'https://www.orfeus-eu.org/epb/c',
  networksStationsUrl: 'https://www.orfeus-eu.org/epb/ns',
  routingUrl: 'https://www.orfeus-eu.org/eidaws/routing/1/query?',
  fdsnEventEmsc: 'https://seismicportal.eu/fdsnws/event/1/query?',
  fdsnEventIris: 'https://service.iris.edu/fdsnws/event/1/query?',
  fdsnEventEthz: ' http://arclink.ethz.ch/fdsnws/event/1/query?',
  fdsnDataSources: [
    {
      name: 'EIDA Federator',
      enabled: false,
      stationUrl:
        'https://federator.orfeus-eu.org/fdsnws/station/1/query',
      dataselectUrl:
        'https://federator.orfeus-eu.org/fdsnws/dataselect/1/query',
      dataselectAuthUrl: null,
    },
    {
      name: 'ODC (The Netherlands)',
      enabled: true,
      stationUrl: 'https://www.orfeus-eu.org/fdsnws/station/1/query',
      dataselectUrl: 'https://www.orfeus-eu.org/fdsnws/dataselect/1/query',
      dataselectAuthUrl:
        'https://www.orfeus-eu.org/fdsnws/dataselect/1/auth',
    },
    {
      name: 'GFZ (Germany)',
      enabled: true,
      stationUrl: 'https://geofon.gfz-potsdam.de/fdsnws/station/1/query',
      dataselectUrl:
        'https://geofon.gfz-potsdam.de/fdsnws/dataselect/1/query',
      dataselectAuthUrl:
        'https://geofon.gfz-potsdam.de/fdsnws/dataselect/1/auth',
    },
    {
      name: 'RESIF (France)',
      enabled: true,
      stationUrl: 'https://ws.resif.fr/fdsnws/station/1/query',
      dataselectUrl: 'https://ws.resif.fr/fdsnws/dataselect/1/query',
      dataselectAuthUrl: 'https://ws.resif.fr/fdsnws/dataselect/1/auth',
    },
    {
      name: 'INGV (Italy)',
      enabled: true,
      stationUrl: 'https://webservices.ingv.it/fdsnws/station/1/query',
      dataselectUrl:
        'https://webservices.ingv.it/fdsnws/dataselect/1/query',
      dataselectAuthUrl:
        'https://webservices.ingv.it/fdsnws/dataselect/1/auth',
    },
    {
      name: 'ETHZ (Switzerland)',
      enabled: true,
      stationUrl: 'https://eida.ethz.ch/fdsnws/station/1/query',
      dataselectUrl: 'https://eida.ethz.ch/fdsnws/dataselect/1/query',
      dataselectAuthUrl: 'https://eida.ethz.ch/fdsnws/dataselect/1/auth',
    },
    {
      name: 'BGR (Germany)',
      enabled: true,
      stationUrl: 'https://eida.bgr.de/fdsnws/station/1/query',
      dataselectUrl: 'https://eida.bgr.de/fdsnws/dataselect/1/query',
      dataselectAuthUrl: 'https://eida.bgr.de/fdsnws/dataselect/1/auth',
    },
    {
      name: 'NIEP (Romania)',
      enabled: true,
      stationUrl: 'https://eida-sc3.infp.ro/fdsnws/station/1/query',
      dataselectUrl: 'https://eida-sc3.infp.ro/fdsnws/dataselect/1/query',
      dataselectAuthUrl:
        'https://eida-sc3.infp.ro/fdsnws/dataselect/1/auth',
    },
    {
      name: 'KOERI (Turkey)',
      enabled: true,
      stationUrl:
        'https://eida-service.koeri.boun.edu.tr/fdsnws/station/1/query',
      dataselectUrl:
        'https://eida-service.koeri.boun.edu.tr/fdsnws/dataselect/1/query',
      dataselectAuthUrl:
        'https://eida-service.koeri.boun.edu.tr/fdsnws/dataselect/1/auth',
    },
    {
      name: 'LMU (Germany)',
      enabled: true,
      stationUrl:
        'https://erde.geophysik.uni-muenchen.de/fdsnws/station/1/query',
      dataselectUrl:
        'https://erde.geophysik.uni-muenchen.de/fdsnws/dataselect/1/query',
      dataselectAuthUrl:
        'https://erde.geophysik.uni-muenchen.de/fdsnws/dataselect/1/auth',
    },
    {
      name: 'NOA (Greece)',
      enabled: true,
      stationUrl: 'https://eida.gein.noa.gr/fdsnws/station/1/query',
      dataselectUrl: 'https://eida.gein.noa.gr/fdsnws/dataselect/1/query',
      dataselectAuthUrl: 'https://eida.gein.noa.gr/fdsnws/dataselect/1/auth',
    },
    {
      name: 'UIB (Norway)',
      enabled: true,
      stationUrl: 'https://eida.geo.uib.no/fdsnws/station/1/query',
      dataselectUrl: 'https://eida.geo.uib.no/fdsnws/dataselect/1/query',
      dataselectAuthUrl: 'https://eida.geo.uib.no/fdsnws/dataselect/1/auth',
    },
  ]
};

/*
 * In development mode, for easier debugging, you can ignore zone related error
 * stack frames such as `zone.run`/`zoneDelegate.invokeTask` by importing the
 * below file. Don't forget to comment it out in production mode
 * because it will have a performance impact when errors are thrown
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
