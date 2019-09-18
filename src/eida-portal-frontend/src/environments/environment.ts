// This file can be replaced during build by using the `fileReplacements` array.
// `ng build ---prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  // networksUrl: "http://127.0.0.1:5000/n",
  // stationsUrl: "http://127.0.0.1:5000/s",
  // channelsUrl: "http://127.0.0.1:5000/c",
  networksUrl: "http://www.orfeus-eu.org/epb/n",
  stationsUrl: "http://www.orfeus-eu.org/epb/s",
  channelsUrl: "http://www.orfeus-eu.org/epb/c",
  networksStationsUrl: "http://www.orfeus-eu.org/epb/ns",
  routingUrl: "http://www.orfeus-eu.org/eidaws/routing/1/query?",
  fdsnEventEmsc: "http://seismicportal.eu/fdsnws/event/1/query?",
  fdsnEventIris: "http://service.iris.edu/fdsnws/event/1/query?",
  federatorStationUrl: "http://federator.orfeus-eu.org/fdsnws/station/1/query",
  federatorDataselectUrl:
    "http://federator.orfeus-eu.org/fdsnws/dataselect/1/query",
  odcStationUrl: "http://www.orfeus-eu.org/fdsnws/station/1/query",
  odcDataselectUrl: "http://www.orfeus-eu.org/fdsnws/dataselect/1/query",
  gfzStationUrl: "http://geofon.gfz-potsdam.de/fdsnws/station/1/query",
  gfzDataselectUrl: "http://geofon.gfz-potsdam.de/fdsnws/dataselect/1/query",
  resifStationUrl: "http://ws.resif.fr/fdsnws/station/1/query",
  resifDataselectUrl: "http://ws.resif.fr/fdsnws/dataselect/1/query",
  ingvStationUrl: "http://webservices.ingv.it/fdsnws/station/1/query",
  ingvDataselectUrl: "http://webservices.ingv.it/fdsnws/dataselect/1/query",
  ethzStationUrl: "http://eida.ethz.ch/fdsnws/station/1/query",
  ethzDataselectUrl: "http://eida.ethz.ch/fdsnws/dataselect/1/query",
  bgrStationUrl: "http://eida.bgr.de/fdsnws/station/1/query",
  bgrDataselectUrl: "http://eida.bgr.de/fdsnws/dataselect/1/query",
  niepStationUrl: "http://eida-sc3.infp.ro/fdsnws/station/1/query",
  niepDataselectUrl: "http://eida-sc3.infp.ro/fdsnws/dataselect/1/query",
  koeriStationUrl:
    "http://eida-service.koeri.boun.edu.tr/fdsnws/station/1/query",
  koeriDataselectUrl:
    "http://eida-service.koeri.boun.edu.tr/fdsnws/dataselect/1/query",
  lmuStationUrl:
    "http://erde.geophysik.uni-muenchen.de/fdsnws/station/1/query",
  lmuDataselectUrl:
    "http://erde.geophysik.uni-muenchen.de/fdsnws/dataselect/1/query",
  noaStationUrl: "http://eida.gein.noa.gr/fdsnws/station/1/query",
  noaDataselectUrl: "http://eida.gein.noa.gr/fdsnws/dataselect/1/query"
};

/*
 * In development mode, for easier debugging, you can ignore zone related error
 * stack frames such as `zone.run`/`zoneDelegate.invokeTask` by importing the
 * below file. Don't forget to comment it out in production mode
 * because it will have a performance impact when errors are thrown
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
