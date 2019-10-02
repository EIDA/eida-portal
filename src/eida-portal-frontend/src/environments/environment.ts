// This file can be replaced during build by using the `fileReplacements` array.
// `ng build ---prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  // networksUrl: "http://127.0.0.1:5000/n",
  // stationsUrl: "http://127.0.0.1:5000/s",
  // channelsUrl: "http://127.0.0.1:5000/c",
  networksUrl: 'https://www.orfeus-eu.org/epb/n',
  stationsUrl: 'https://www.orfeus-eu.org/epb/s',
  channelsUrl: 'https://www.orfeus-eu.org/epb/c',
  networksStationsUrl: 'https://www.orfeus-eu.org/epb/ns',
  routingUrl: 'https://www.orfeus-eu.org/eidaws/routing/1/query?',
  fdsnEventEmsc: 'https://seismicportal.eu/fdsnws/event/1/query?',
  fdsnEventIris: 'https://service.iris.edu/fdsnws/event/1/query?',
  federatorStationUrl: 'https://federator.orfeus-eu.org/fdsnws/station/1/query',
  federatorDataselectUrl:
    'https://federator.orfeus-eu.org/fdsnws/dataselect/1/query',
  federatorDataselectAuthUrl: null,
  odcStationUrl: 'https://www.orfeus-eu.org/fdsnws/station/1/query',
  odcDataselectUrl: 'https://www.orfeus-eu.org/fdsnws/dataselect/1/query',
  odcDataselectAuthUrl: 'https://www.orfeus-eu.org/fdsnws/dataselect/1/auth',
  gfzStationUrl: 'https://geofon.gfz-potsdam.de/fdsnws/station/1/query',
  gfzDataselectUrl: 'https://geofon.gfz-potsdam.de/fdsnws/dataselect/1/query',
  gfzDataselectAuthUrl:
    'https://geofon.gfz-potsdam.de/fdsnws/dataselect/1/auth',
  resifStationUrl: 'https://ws.resif.fr/fdsnws/station/1/query',
  resifDataselectUrl: 'https://ws.resif.fr/fdsnws/dataselect/1/query',
  resifDataselectAuthUrl: 'https://ws.resif.fr/fdsnws/dataselect/1/auth',
  ingvStationUrl: 'https://webservices.ingv.it/fdsnws/station/1/query',
  ingvDataselectUrl: 'https://webservices.ingv.it/fdsnws/dataselect/1/query',
  ingvDataselectAuthUrl: 'https://webservices.ingv.it/fdsnws/dataselect/1/auth',
  ethzStationUrl: 'https://eida.ethz.ch/fdsnws/station/1/query',
  ethzDataselectUrl: 'https://eida.ethz.ch/fdsnws/dataselect/1/query',
  ethzDataselectAuthUrl: 'https://eida.ethz.ch/fdsnws/dataselect/1/auth',
  bgrStationUrl: 'https://eida.bgr.de/fdsnws/station/1/query',
  bgrDataselectUrl: 'https://eida.bgr.de/fdsnws/dataselect/1/query',
  bgrDataselectAuthUrl: 'https://eida.bgr.de/fdsnws/dataselect/1/auth',
  niepStationUrl: 'https://eida-sc3.infp.ro/fdsnws/station/1/query',
  niepDataselectUrl: 'https://eida-sc3.infp.ro/fdsnws/dataselect/1/query',
  niepDataselectAuthUrl: 'https://eida-sc3.infp.ro/fdsnws/dataselect/1/auth',
  koeriStationUrl:
    'https://eida-service.koeri.boun.edu.tr/fdsnws/station/1/query',
  koeriDataselectUrl:
    'https://eida-service.koeri.boun.edu.tr/fdsnws/dataselect/1/query',
  koeriDataselectAuthUrl:
    'https://eida-service.koeri.boun.edu.tr/fdsnws/dataselect/1/auth',
  lmuStationUrl:
    'https://erde.geophysik.uni-muenchen.de/fdsnws/station/1/query',
  lmuDataselectUrl:
    'https://erde.geophysik.uni-muenchen.de/fdsnws/dataselect/1/query',
  lmuDataselectAuthUrl:
    'https://erde.geophysik.uni-muenchen.de/fdsnws/dataselect/1/auth',
  noaStationUrl: 'https://eida.gein.noa.gr/fdsnws/station/1/query',
  noaDataselectUrl: 'https://eida.gein.noa.gr/fdsnws/dataselect/1/query',
  noaDataselectAuthUrl: 'https://eida.gein.noa.gr/fdsnws/dataselect/1/auth'
};

/*
 * In development mode, for easier debugging, you can ignore zone related error
 * stack frames such as `zone.run`/`zoneDelegate.invokeTask` by importing the
 * below file. Don't forget to comment it out in production mode
 * because it will have a performance impact when errors are thrown
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
