export class StationsModel {
    yearFrom: string;
    yearTo: string;
    networkTypes: {};
    networkCodes: {};
    coordinateN: number;
    coordinateS: number;
    coordinateE: number;
    coordinateW: number;
    selectedNetworkType;
    selectedNetworkCode;

    constructor() {
        this.yearFrom = "1980";
        this.yearTo = "2018";
        this.networkTypes = [
            {'id': 0, 'name': 'All networks'},
            {'id': 1, 'name': 'Virtual networks'}
        ];
        this.networkCodes = [
            {'id': 0, 'name': 'All networks'},
            {'id': 1, 'name': 'NL 1993'},
            {'id': 2, 'name': 'Z3 2015'}
        ];
        this.coordinateN = 90.0;
        this.coordinateS = -90.0;
        this.coordinateE = 180.0;
        this.coordinateW = -180.0;
        this.selectedNetworkType = this.networkTypes[0];
        this.selectedNetworkCode = this.networkCodes[0];
    }

    toString() {
        return `Year: ${this.yearFrom} - ${this.yearTo}, 
        network type: ${this.selectedNetworkType.name},
        network code: ${this.selectedNetworkCode.name},
        coordinates: ${this.coordinateN}N, ${this.coordinateS}S, ${this.coordinateE}E, ${this.coordinateW}W`;
    }
}

export class EventsModel {
    catalogs: {};
    minimumMagnitude: number;
    dateFrom: string;
    dateTo: string;
    depthFrom: number;
    depthTo: number;
    coordinateN: number;
    coordinateS: number;
    coordinateE: number;
    coordinateW: number;
    selectedCatalog;

    constructor() {
        this.catalogs = [
            {'id':0, 'name': "EIDA"},
            {'id':1, 'name': "IRIS"}
        ];
        this.minimumMagnitude = 0.0;
        this.dateFrom = "2017-01-01";
        this.dateTo = "2018-01-01";
        this.depthFrom = 0;
        this.depthTo = 999;
        this.coordinateN = 90.0;
        this.coordinateS = -90.0;
        this.coordinateE = 180.0;
        this.coordinateW = -180.0;
        this.selectedCatalog = this.catalogs[0];
    }

    toString() {
        return `Catalog: ${this.selectedCatalog.name},
        minimum magnitude: ${this.minimumMagnitude},
        date: ${this.dateFrom} - ${this.dateTo},
        depth: ${this.depthFrom} - ${this.depthTo},
        coordinates: ${this.coordinateN}N, ${this.coordinateS}S, ${this.coordinateE}E, ${this.coordinateW}W`;
    }
}

export class MapModel {

}

export class RequestModel {
    datetimeFrom: string;
    datetimeTo: string;
    fdsnRequestType: {};
    selectedFdsnRequestType;

    constructor() {
        this.datetimeFrom = "2017-01-01T12:00:00";
        this.datetimeTo = "2018-01-01T12:00:00";
        this.fdsnRequestType = [
            {'id': 0, 'name': 'Waveform (Mini-SEED)'},
            {'id': 1, 'name': 'Metadata (StationXML)'},
            {'id': 2, 'name': 'Metadata (Text)'}
        ];
        this.selectedFdsnRequestType = this.fdsnRequestType[0];
    }

    toString() {
        return `Datetime: ${this.datetimeFrom} - ${this.datetimeTo},
        request type: ${this.selectedFdsnRequestType.name}`;
    }
}