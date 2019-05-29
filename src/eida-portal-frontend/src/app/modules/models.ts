// Created manually

import { Enums } from './enums';
import { environment } from '../../environments/environment';

export class StationsModel {
    yearFrom: string;
    yearTo: string;
    coordinateN: number;
    coordinateS: number;
    coordinateE: number;
    coordinateW: number;
    selectedNetwork;
    selectedStation;
    dataSource: Enums.StationDataSource;
    stationSelectionMethod: Enums.StationSelectionMethods;
    streamSelectionMethod: Enums.StationStreamSelectionMethods;
    eventDistanceFrom: number;
    eventDistanceTo: number;
    eventAzimuthFrom: number;
    eventAzimuthTo: number;
    targetSamplingRate: number;
    availableStreams: Array<StationStreamModel>;
    worksetStreams: Array<StationStreamModel>;

    constructor() {
        this.yearFrom = "1900";
        this.yearTo = "2100";
        this.coordinateN = 90.0;
        this.coordinateS = -90.0;
        this.coordinateE = 180.0;
        this.coordinateW = -180.0;
        this.selectedNetwork = 'All';
        this.selectedStation = 'All';
        this.dataSource = Enums.StationDataSource.Inventory;
        this.stationSelectionMethod = Enums.StationSelectionMethods.Code;
        this.streamSelectionMethod = Enums.StationStreamSelectionMethods.Code;
        this.eventDistanceFrom = 0.0;
        this.eventDistanceTo = 100.0;
        this.eventAzimuthFrom = 0.0;
        this.eventAzimuthTo = 360.0;
        this.targetSamplingRate = 20.0;
        this.availableStreams = new Array<StationStreamModel>();
        this.worksetStreams = new Array<StationStreamModel>();
    }

    toString() {
        return `Year: ${this.yearFrom} - ${this.yearTo}, 
        coordinates: ${this.coordinateN}N, ${this.coordinateS}S, ${this.coordinateE}E, ${this.coordinateW}W,
        network: ${this.selectedNetwork.code}, station: ${this.selectedStation.stat}`;
    }

    clearStationSelection() {
        this.selectedStation = 'All';
    }

    clearAvailableStreams() {
        this.availableStreams = new Array<StationStreamModel>();
    }

    clearWorksetStreams() {
        this.worksetStreams = new Array<StationStreamModel>();
    }

    getSelectedStreams() {
        return this.worksetStreams.filter(k => k.selected);
    }

    allStreamsSelected(): boolean {
        return this.worksetStreams.find(k => !k.selected) === undefined;
    }
}

export class StationStreamModel {
    streamCode: string;
    appearances: number;
    selected: boolean;

    constructor() {
        this.streamCode = '';
        this.appearances = 0;
        this.selected = true;
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
    resultLimit: number;
    selectedCatalog;

    constructor() {
        this.catalogs = [
            {
                'id':0,
                'name': "EMSC",
                'url': environment.fdsnEventEmsc
            },
            {
                'id':1,
                'name': "IRIS",
                'url': environment.fdsnEventIris
            }
        ];
        this.minimumMagnitude = 0.0;
        this.dateFrom = "2018-01-01";
        this.dateTo = "2019-01-01";
        this.depthFrom = 0;
        this.depthTo = 999;
        this.coordinateN = 90.0;
        this.coordinateS = -90.0;
        this.coordinateE = 180.0;
        this.coordinateW = -180.0;
        this.resultLimit = 100;
        this.selectedCatalog = this.catalogs[0];
    }

    toString() {
        return `Catalog: ${this.selectedCatalog},
        minimum magnitude: ${this.minimumMagnitude},
        date: ${this.dateFrom} - ${this.dateTo},
        depth: ${this.depthFrom} - ${this.depthTo},
        coordinates: ${this.coordinateN}N, ${this.coordinateS}S, ${this.coordinateE}E, ${this.coordinateW}W`;
    }

    // Get selected catalog URL
    getSelCatUrl() {
        for (var i = 0; i < Object.keys(this.catalogs).length; i++) {
            if (this.catalogs[i].id === this.selectedCatalog.id) {
                return this.catalogs[i].url;
            }
        }
    }
}

export class MapModel {

}

export class RequestModel {
    fdsnRequestTypes: {};
    absoluteModeTimeMethods: {};
    datetimeFrom: string;
    datetimeTo: string;
    absoluteModeStart: number;
    absoluteModeEnd: number;
    timeWindowSelectionMode: Enums.RequestTimeWindowSelectionModes;
    selectedFdsnRequestType;
    selectedAbsoluteModeStartTimeMethod;
    selectedAbsoluteModeEndTimeMethod;

    constructor() {
        this.fdsnRequestTypes = [
            { 'id': 0, 'name': 'Waveform (Mini-SEED)' },
            { 'id': 1, 'name': 'Metadata (StationXML)' },
            { 'id': 2, 'name': 'Metadata (Text)' }
        ];
        this.absoluteModeTimeMethods = [
            { 'id': 0, 'name': 'Origin Time'},
            { 'id': 1, 'name': 'P/Pdiff'},
            { 'id': 2, 'name': 'S/Sdiff'}
        ]
        this.datetimeFrom = "2017-01-01T12:00:00";
        this.datetimeTo = "2018-01-01T12:00:00";
        this.absoluteModeStart = 2;
        this.absoluteModeEnd = 10;
        this.timeWindowSelectionMode = Enums.RequestTimeWindowSelectionModes.Absolute;
        this.selectedFdsnRequestType = this.fdsnRequestTypes[0];
        this.selectedAbsoluteModeStartTimeMethod = this.absoluteModeTimeMethods[0];
        this.selectedAbsoluteModeEndTimeMethod = this.absoluteModeTimeMethods[0];
    }

    toString() {
        return `Datetime: ${this.datetimeFrom} - ${this.datetimeTo},
        request type: ${this.selectedFdsnRequestType}`;
    }
}

export class FdsnNetwork {
    code: string;
    desc: string;
    start: string;
    end: string;

    constructor() {
        this.code = 'ALL';
        this.desc = 'ALL';
        this.start = '';
        this.end = '';
    }
}

export class FdsnStation {
    net: string;
    stat: string;
    loc: string;
    cha: string;
    lat: number;
    lon: number;
    elev: number;
    dep: string;
    name: string;
    start: string;
    end: string;

    constructor() {
        this.net = 'ALL';
        this.stat = 'ALL';
        this.loc = 'ALL';
        this.cha = 'ALL';
        this.lat = 0.0;
        this.lon = 0.0;
        this.elev = 0.0;
        this.dep = 'ALL';
        this.name = 'ALL';
        this.start = 'ALL';
        this.end = 'ALL';
    }
}

export class FdsnStationExt extends FdsnStation {
    selected: boolean;

    constructor() {
        super();
        this.selected = true;
    }

    getCoordinates() : string {
        try {
            return `Lat: ${Number(this.lat).toFixed(2)}, Lon: ${Number(this.lon).toFixed(2)}`;   
        } catch {
            return `Lat: ${this.lat}, Lon: ${this.lon}`;
        }
    }
}

export class MapDragBoxCoordinates {
    coordN: number;
    coordS: number;
    coordE: number;
    coordW: number;

    constructor() {
        this.coordN = 90.0;
        this.coordS = -90.0;
        this.coordE = 180.0;
        this.coordW = -180.0;
    }

    getRounded(): MapDragBoxCoordinates {
        this.coordN = Math.round(this.coordN * 100) / 100;
        this.coordS = Math.round(this.coordS * 100) / 100;
        this.coordE = Math.round(this.coordE * 100) / 100;
        this.coordW = Math.round(this.coordW * 100) / 100;
        return this;
    }
}