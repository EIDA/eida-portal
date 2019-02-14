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
          
          event.type = e.type[0];
          event.preferredMagnitudeID = e.preferredMagnitudeID[0];
          event.preferredOriginID = e.preferredOriginID[0];
          event.description.type = e.description[0].type[0];
          event.description.text = e.description[0].text[0];
          event.magnitude.creationInfo.author = e.magnitude[0].creationInfo[0].author[0];
          event.magnitude.mag.value = e.magnitude[0].mag[0].value[0];
          event.origin.time = e.origin[0].time[0].value[0];
          event.origin.creationInfo.author = e.origin[0].creationInfo[0].author[0];
          event.origin.latitude = e.origin[0].latitude[0].value[0];
          event.origin.longitude = e.origin[0].longitude[0].value[0];
          event.origin.depth = e.origin[0].depth[0].value[0];

          result.quakeml.eventParameters.event.push(event);
        }

        return result;
    }
}