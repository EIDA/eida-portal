// TS classes generated from json

export namespace FdsnEventsResponseModels {

    export class Description {
        type: string;
        text: string;
        // _xmlns:iris: string;
        // _iris:FEcode: string;
    }

    export class Time {
        value: Date;

        constructor() {
            this.value = new Date();
        }
    }

    export class CreationInfo {
        author: string;
    }

    export class Coordinate {
        value: string;
    }

    export class Depth {
        value: string;
    }

    export class Origin {
        time: Time;
        creationInfo: CreationInfo;
        latitude: Coordinate;
        longitude: Coordinate;
        depth: Depth;
        // _xmlns:iris: string;
        _publicID: string;
        // _iris:contributorOriginId: string;
        // _iris:contributor: string;
        // _iris:contributorEventId: string;
        // _iris:catalog: string;

        constructor() {
            this.time = new Time();
            this.creationInfo = new CreationInfo();
            this.latitude = new Coordinate();
            this.longitude = new Coordinate();
            this.depth = new Depth();
        }
    }

    export class Mag {
        value: string;
    }

    export class Magnitude {
        mag: Mag;
        type: string;
        creationInfo: CreationInfo;
        _publicID: string;

        constructor() {
            this.creationInfo = new CreationInfo();
            this.mag = new Mag();
        }
    }

    export class Event {
        type: string;
        description: Description;
        preferredMagnitudeID: string;
        preferredOriginID: string;
        origin: Origin;
        magnitude: Magnitude;
        _publicID: string;

        constructor() {
            this.description = new Description();
            this.origin = new Origin();
            this.magnitude = new Magnitude();
        }
    }

    export class EventParameters {
        event: Event[];
        _publicID: string;

        constructor() {
            this.event = new Array<Event>();
        }
    }

    export class Quakeml {
        eventParameters: EventParameters;
        // _xmlns:q: string;
        // _xmlns:iris: string;
        _xmlns: string;
        // _xmlns:xsi: string;
        // _xsi:schemaLocation: string;
        __prefix: string;

        constructor() {
            this.eventParameters = new EventParameters();
        }
    }

    export class FdsnEventsRoot {
        quakeml: Quakeml;

        constructor() {
            this.quakeml = new Quakeml();
        }
    }
}
