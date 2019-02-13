// Created manually
import { FdsnEventsResponseModels } from '../modules/models.fdsn-events';

export class SerializationHelper {
    static toInstance<T>(obj: T, json: string): T {
        var jsonObj = JSON.parse(json);

        if (typeof obj["fromJSON"] === "function") {
            obj["fromJSON"](jsonObj);
        }
        else {
            for (var propName in jsonObj) {
                obj[propName] = jsonObj[propName]
            }
        }

        return obj;
    }

    static eventsJsonToObjGraph(json): FdsnEventsResponseModels.FdsnEventsRoot {
        let result = new FdsnEventsResponseModels.FdsnEventsRoot();
        
        for (let e of json['q:quakeml'].eventParameters[0].event) {
          let event = new FdsnEventsResponseModels.Event();
          
          event.preferredMagnitudeID = e.preferredMagnitudeID[0];
          event.preferredOriginID = e.preferredOriginID[0];

          result.quakeml.eventParameters.event.push(event);
        
        }

        return result;
    }
}