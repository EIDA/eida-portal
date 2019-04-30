// Created manually
export namespace Enums {
    export enum EventsCatalog {
        EMSC = 0,
        IRIS = 1
    }

    export enum StationDataSource {
        Inventory = 0,
        File = 1
    }
    
    export enum StationSelectionMethod {
        Code = 0,
        Region = 1,
        Events = 2
    }

    export enum StationStreamSelectionMethod {
        Code = 0,
        Sampling = 1
    }

    export enum RequestTimeWindowSelectionMode {
        Absolute = 0,
        Relative = 1
    }
}