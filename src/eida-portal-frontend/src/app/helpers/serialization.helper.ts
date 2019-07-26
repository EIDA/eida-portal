// Created manually
import { FdsnEventsResponseModels } from "../modules/models.fdsn-events";

export class SerializationHelper {
  static toInstance<T>(obj: T, json: string): T {
    var jsonObj = JSON.parse(json);

    if (typeof obj["fromJSON"] === "function") {
      obj["fromJSON"](jsonObj);
    } else {
      for (var propName in jsonObj) {
        obj[propName] = jsonObj[propName];
      }
    }

    return obj;
  }

  static eventsJsonToObjGraph(json): FdsnEventsResponseModels.FdsnEventsRoot {
    let result = new FdsnEventsResponseModels.FdsnEventsRoot();

    for (let e of json["q:quakeml"].eventParameters[0].event) {
      let event = new FdsnEventsResponseModels.EventExt();

      // Not provided by EMSC
      event.type = e.type != null ? e.type[0] : "none";

      event.preferredMagnitudeID = e.preferredMagnitudeID[0];
      event.preferredOriginID = e.preferredOriginID[0];
      event._publicID = e.$.publicID;
      event.description.type = e.description[0].type[0];
      event.description.text = e.description[0].text[0];

      // Not provided by EMSC
      event.magnitude.creationInfo.author =
        e.magnitude != null &&
        e.magnitude[0].creationInfo != null &&
        e.magnitude[0].creationInfo[0].author != null
          ? e.magnitude[0].creationInfo[0].author[0]
          : "none";

      event.magnitude.mag.value = e.magnitude[0].mag[0].value[0];
      event.origin.time.value = e.origin[0].time[0].value[0];

      // Not provided by EMSC
      event.origin.creationInfo.author =
        e.origin != null &&
        e.origin[0].creationInfo != null &&
        e.origin[0].creationInfo[0].author != null
          ? e.origin[0].creationInfo[0].author[0]
          : "none";

      event.origin.latitude = e.origin[0].latitude[0].value[0];
      event.origin.longitude = e.origin[0].longitude[0].value[0];
      event.origin.depth = e.origin[0].depth[0].value[0];

      result.quakeml.eventParameters.event.push(event);
    }

    return result;
  }
}
