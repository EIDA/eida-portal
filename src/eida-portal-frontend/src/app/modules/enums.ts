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

  export enum stationChannelSelectionMethods {
    Code = 0,
    Sampling = 1
  }

  export enum RequestTimeWindowSelectionModes {
    Absolute = 0,
    Relative = 1
  }

  export enum MetadataFormats {
    StationXML = 0,
    Text = 1
  }

  export enum NotificationLevels {
    Undefined = 0,
    Info = 1,
    Warning = 2,
    Error = 3
  }

  export enum EidaTokenAuthenticationStatus {
    Undefined = 0,
    Processing = 1,
    Valid = 2,
    Invalid = 3
  }
}
