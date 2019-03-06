// Created manually
import { FdsnStation } from '../modules/models';
import { FdsnEventsResponseModels } from '../modules/models.fdsn-events';

export class GisHelper {
    // Calculate the azimuth between event origin and station coordinates
    static coordinatesToDistance(
        eventOrigin: FdsnEventsResponseModels.Origin,
        station: FdsnStation
    ): number {
        try {
            // var lon1 = this.toRad(+eventOrigin.longitude);
            var lat1 = this.toRad(+eventOrigin.latitude);
            // var lon2 = this.toRad(+station.lon);
            var lat2 = this.toRad(+station.lat);
            var dLon = this.toRad(+station.lon - +eventOrigin.longitude);
            var dLat = this.toRad(+station.lat - +eventOrigin.latitude);

            var a = Math.sin(dLat/2) * Math.sin(dLat/2) +
                    Math.sin(dLon/2) * Math.sin(dLon/2) * Math.cos(lat1) * Math.cos(lat2)
            var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a))
            var d = c * 6371;
            return d;
        } catch (ex) {
            throw ex;
        }
    }

    static coordinatesToBearing(
        eventOrigin: FdsnEventsResponseModels.Origin,
        station: FdsnStation
    ): number {
        try {
            // var lon1 = this.toRad(+eventOrigin.longitude);
            var lat1 = +eventOrigin.latitude;
            var lon2 = +station.lon;
            var lat2 = +station.lat;
            var dLon = +station.lon - +eventOrigin.longitude;
            var dLat = +station.lat - +eventOrigin.latitude;

            var y = Math.sin(dLon) * Math.cos(lat2);
            var x = Math.cos(lat1) * Math.sin(lat2) -
                    Math.sin(lat1) * Math.cos(lat2) * Math.cos(dLon);
            var bearing = Math.atan2(y, x);
            var bearingDeg = this.toDeg(bearing);
            return bearingDeg;
        } catch (ex) {
            throw ex;
        }
    }

    static toRad(num) {
        return num * Math.PI / 180
    }

    static toDeg(num) {
        return (num + 360) % 360;
    }
}