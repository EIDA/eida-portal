export class StationsModel {
    yearFrom: string;
    yearTo: string;
    coordinateN: number;
    coordinateS: number;
    coordinateE: number;
    coordinateW: number;

    constructor() {
        this.yearFrom = "1980";
        this.yearTo = "2018";
        this.coordinateN = 90.0;
        this.coordinateS = -90.0;
        this.coordinateE = 180.0;
        this.coordinateW = -180.0;
    }
}

export class EventsModel {

}

export class MapModel {

}

export class RequestModel {

}