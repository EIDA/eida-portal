// Created manually
import { FdsnStation } from '../modules/models';
import { FdsnEventsResponseModels } from '../modules/models.fdsn-events';
import * as turf from '../../assets/js/turf/turf.min.js';

declare var turf: any;

export class GisHelper {
    // Calculate the azimuth between event origin and station coordinates
    static coordinatesToDistance(
        eventOrigin: FdsnEventsResponseModels.Origin,
        station: FdsnStation
    ): number {
        try {
            let p1 = turf.point([eventOrigin.longitude, eventOrigin.latitude]);
            let p2 = turf.point([station.longitude, station.latitude]);
            let options = {units: 'kilometers'};
            var d = turf.distance(p1, p2, options);
            return d;
        } catch (ex) {
            throw ex;
        }
    }

    static coordinatesToAzimuth(
        eventOrigin: FdsnEventsResponseModels.Origin,
        station: FdsnStation
    ): number {
        try {
            let p1 = turf.point([eventOrigin.longitude, eventOrigin.latitude]);
            let p2 = turf.point([station.longitude, station.latitude]);
            let b = turf.bearingToAzimuth(turf.bearing(p1, p2));
            return b;
        } catch (ex) {
            throw ex;
        }
    }

    static toRad(num) {
        return num * Math.PI / 180
    }

    static toDeg(num) {
        return ((num + 360) % 360) * 100;
    }
}