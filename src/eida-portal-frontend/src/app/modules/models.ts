// Created manually

import { Enums } from './enums';
import { environment } from '../../environments/environment';
import { DateHelper } from '../helpers/date.helper';

export class StationsModel {
    networkTypes: {}
    yearFrom: string;
    yearTo: string;
    coordinateN: number;
    coordinateS: number;
    coordinateE: number;
    coordinateW: number;
    selectedNetworkType;
    selectedNetwork;
    selectedStation;
    dataSource: Enums.StationDataSource;
    stationSelectionMethod: Enums.StationSelectionMethods;
    channelSelectionMethod: Enums.stationChannelSelectionMethods;
    eventDistanceFrom: number;
    eventDistanceTo: number;
    eventAzimuthFrom: number;
    eventAzimuthTo: number;
    targetSamplingRate: number;
    availableChannels: Array<StationChannelModel>;
    worksetChannels: Array<StationChannelModel>;

    constructor() {
        const dh = new DateHelper();

        this.networkTypes = [
            {
                'id': 0,
                'name': 'All networks'
            },
            {
                'id': 1,
                'name': 'Permanent networks'
            },
            {
                'id': 2,
                'name': 'Temporary networks'
            }
        ];

        this.yearFrom = dh.getYearWithOffset(-50);
        this.yearTo = dh.getYearWithOffset();
        this.coordinateN = 90.0;
        this.coordinateS = -90.0;
        this.coordinateE = 180.0;
        this.coordinateW = -180.0;
        this.selectedNetworkType = this.networkTypes[0];
        this.selectedNetwork = 'All';
        this.selectedStation = 'All';
        this.dataSource = Enums.StationDataSource.Inventory;
        this.stationSelectionMethod = Enums.StationSelectionMethods.Code;
        this.channelSelectionMethod = Enums.stationChannelSelectionMethods.Code;
        this.eventDistanceFrom = 0.0;
        this.eventDistanceTo = 100.0;
        this.eventAzimuthFrom = 0.0;
        this.eventAzimuthTo = 360.0;
        this.targetSamplingRate = 20.0;
        this.availableChannels = new Array<StationChannelModel>();
        this.worksetChannels = new Array<StationChannelModel>();
    }

    toString() {
        return `Year: ${this.yearFrom} - ${this.yearTo}, 
        coordinates: ${this.coordinateN}N, ${this.coordinateS}S, ${this.coordinateE}E, ${this.coordinateW}W,
        network: ${this.selectedNetwork.code}, station: ${this.selectedStation.code}`;
    }

    clearStationSelection() {
        this.selectedStation = 'All';
    }

    clearAvailableChannels() {
        this.availableChannels = new Array<StationChannelModel>();
    }

    clearWorksetChannels() {
        this.worksetChannels = new Array<StationChannelModel>();
    }

    getSelectedChannels() {
        return this.worksetChannels.filter(k => k.channel_selected);
    }

    allChannelsSelected(): boolean {
        return this.worksetChannels.find(k => !k.channel_selected) === undefined;
    }
}

export class StationChannelModel {
    channel_code: string;
    channel_appearances: number;
    channel_selected: boolean;

    constructor() {
        this.channel_code = '';
        this.channel_appearances = 0;
        this.channel_selected = true;
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
        const dh = new DateHelper();

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
        this.dateFrom = dh.getDateWithOffset(-1);
        this.dateTo = dh.getDateWithOffset();
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
        for (let i = 0; i < Object.keys(this.catalogs).length; i++) {
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
        const dh = new DateHelper();

        this.fdsnRequestTypes = [
            { 'id': 0, 'name': 'Waveform (Mini-SEED)' },
            { 'id': 1, 'name': 'Metadata (StationXML)' },
            { 'id': 2, 'name': 'Metadata (Text)' }
        ];

        this.absoluteModeTimeMethods = [
            { 'id': 0, 'name': 'Origin Time'},
            { 'id': 1, 'name': 'P/Pdiff'},
            { 'id': 2, 'name': 'S/Sdiff'}
        ];

        this.datetimeFrom = dh.getDateTimeWithOffset(null, -1);
        this.datetimeTo = dh.getDateTimeWithOffset();
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
    network_code: string;
    network_description: string;
    network_start_date: string;
    network_start_year: string;
    network_end_date: string;
    network_end_year: string;
    network_temporary: boolean;

    constructor() {
        this.network_code = 'ALL';
        this.network_description = 'ALL';
        this.network_start_date = '';
        this.network_start_year = '';
        this.network_end_date = '';
        this.network_end_year = '';
        this.network_temporary = false;
    }
}

export class FdsnStation {
    station_network_code: string;
    station_network_start_year: string;
    station_network_temporary: boolean;
    station_code: string;
    station_latitude: number;
    station_longitude: number;
    station_elevation: number;
    station_site_name: string;
    station_start_date: string;
    station_start_year: string;
    station_end_date: string;
    station_end_year: string;
    station_restricted_status: string;

    constructor() {
        this.station_network_code = 'ALL';
        this.station_network_start_year = 'ALL';
        this.station_network_temporary = false;
        this.station_code = 'ALL';
        this.station_latitude = 0.0;
        this.station_longitude = 0.0;
        this.station_elevation = 0.0;
        this.station_site_name = 'ALL';
        this.station_start_date = 'ALL';
        this.station_start_year = 'ALL';
        this.station_end_date = 'ALL';
        this.station_end_year = 'ALL';
        this.station_restricted_status = 'ALL';
    }
}

export class FdsnStationExt extends FdsnStation {
    station_selected: boolean;

    constructor() {
        super();
        this.station_selected = true;
    }

    getCoordinates() : string {
        try {
            return `Lat: ${Number(this.station_latitude).toFixed(2)}, Lon: ${Number(this.station_longitude).toFixed(2)}`;   
        } catch {
            return `Lat: ${this.station_latitude}, Lon: ${this.station_longitude}`;
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

export class ProgressBar {
    dividend: string;
    divisor: string;
    completed: boolean;
    indeterminate: boolean;
    message: string;

    constructor() {
        this.dividend = '1';
        this.divisor = '100';
        this.completed = false;
        this.indeterminate = false;
        this.message = '';
    }
}
