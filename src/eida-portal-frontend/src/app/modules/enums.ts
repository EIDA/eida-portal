// Created manually
export namespace Enums {
    export enum EventsCatalogs {
        EMSC = 0,
        IRIS = 1
    }

    export enum StationDataSource {
        Inventory = 0,
        File = 1
    }
    
    export enum StationSelectionMethods {
        Code = 0,
        Region = 1,
        Events = 2
    }

    export enum StationStreamSelectionMethods {
        Code = 0,
        Sampling = 1
    }

    export enum RequestTimeWindowSelectionModes {
        Absolute = 0,
        Relative = 1
    }

    export enum MetadataFormats {
        StationXML = 1,
        Text = 1
    }
}