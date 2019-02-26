// This file can be replaced during build by using the `fileReplacements` array.
// `ng build ---prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  networksUrl:  'https://www.orfeus-eu.org/epb/n',
  stationsUrl: 'https://www.orfeus-eu.org/epb/s',
  networksStationsUrl: 'https://www.orfeus-eu.org/epb/ns',
  fdsnEventEmsc: 'http://seismicportal.eu/fdsnws/event/1/query?',
  fdsnEventIris: 'http://service.iris.edu/fdsnws/event/1/query?'
};

/*
 * In development mode, for easier debugging, you can ignore zone related error
 * stack frames such as `zone.run`/`zoneDelegate.invokeTask` by importing the
 * below file. Don't forget to comment it out in production mode
 * because it will have a performance impact when errors are thrown
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
