import { Injectable } from '@angular/core';
import { catchError, map, tap } from 'rxjs/operators';
import { environment } from '../environments/environment';
import { EidaService } from './eida.service';
import { EventsModel } from './modules/models';
import { Observable, Subject, BehaviorSubject } from 'rxjs';
import { HttpClient, HttpHeaders, HttpClientModule } from '@angular/common/http';
import { FdsnEventsResponseModels } from '../app/modules/models.fdsn-events';
import { Parser } from 'xml2js';
import { SerializationHelper } from './helpers/serialization.helper';

@Injectable({
  providedIn: 'root'
})
export class EventsService {
  /*
  The idea behind obtaining the events is following:
  - FDSN WS XML response is converted to JSON
  - JSON is parsed to object graph
  - Object graph is inserted in allEvents Subject
  - allEvents is listened to and triggers inserting
    events to local _mapEvents Array
  - When inserted, _mapEvents is inserted into selectedEvents Subject
  - Everyone is subscribing to selectedEvents
  - When something needs to be changed, we change _mapEvents and
    insert it to selectedEvents Subject
  */
  private _mapEvents = new Array<FdsnEventsResponseModels.EventExt>();
  public allEvents = new Subject<FdsnEventsResponseModels.EventExt[]>();
  public selectedEvents = new BehaviorSubject(new Array<FdsnEventsResponseModels.EventExt>());
  public eventsResponse = new Subject<Object>();
  public focusedEvent = new Subject<FdsnEventsResponseModels.EventExt>();
  // public eventsObjGraph = new Subject<FdsnEventsResponseModels.FdsnEventsRoot>();

  constructor(
    private _eidaService: EidaService
  ) {
    this.eventsResponse.subscribe(
      resp => this.eventsXmlToObjGraph(resp, this.allEvents)
    );

    this.allEvents.subscribe(
      e => this.addReceivedEvents(e)
    );
  }

  // Extract json data to object graph for easier operation (map rendering etc)
  eventsXmlToObjGraph(resp, allEvents) {
    let p = new Parser();
    p.parseString(resp, function(err, result) {
      if (err) {throw err;}

      try {
        let json = JSON.parse(JSON.stringify(result));
        let objGraph = SerializationHelper.eventsJsonToObjGraph(json);
        allEvents.next(objGraph.quakeml.eventParameters.event);
      } catch (ex) {
        this.log(ex);
        allEvents.next(new FdsnEventsResponseModels.FdsnEventsRoot());
      }
    }.bind(this._eidaService));
  }

  addReceivedEvents(events: FdsnEventsResponseModels.EventExt[]) {
    for (let e of events) {
      this._mapEvents.push(e);
    }
    this.updateEvents(this._mapEvents);
  }

  getEvents(e: EventsModel) {
    let url = this.buildEventsUrl(e);

    // let headers: HttpHeaders = new HttpHeaders();
    // headers = headers.append('Access-Control-Allow-Origin', '*');
    // headers = headers.append('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    // headers = headers.append('Access-Control-Allow-Methods', 'GET');

    // const httpOptions = {
    //   headers: headers
    // };

    this._eidaService.http.get(url, {responseType: 'text'})
      .pipe(
        tap(_ => this._eidaService.log('fetched events data')),
        catchError(this._eidaService.handleError('getEvents', []))
      ).subscribe(
        r => this.eventsResponse.next(r)
      );
  }

  // Build the URL from base URL and payload
  buildEventsUrl(e: EventsModel): string {
    return `${e.getSelCatUrl()}` +
    `&minmag=${e.minimumMagnitude}` +
    `&start=${e.dateFrom}` +
    `&end=${e.dateTo}` +
    `&mindepth=${e.depthFrom}` +
    `&maxdepth=${e.depthTo}` +
    `&minlat=${e.coordinateS}` +
    `&maxlat=${e.coordinateN}` +
    `&minlon=${e.coordinateW}` +
    `&maxlon=${e.coordinateE}` +
    `&limit=${e.resultLimit}`;
  }

  toggleEventSelection(s: FdsnEventsResponseModels.EventExt) {
    this._mapEvents.find(
      p => p._publicID === s._publicID
    ).selected = !s.selected;
    this.updateEvents(this._mapEvents);
  }

  removeEventSelection(s: FdsnEventsResponseModels.EventExt) {
    let i = this._mapEvents.indexOf(
      this._mapEvents.find(p => p._publicID === s._publicID)
    );
    this._mapEvents.splice(i, 1);
    this.updateEvents(this._mapEvents);
  }

  removeAllEvents() {
    this._mapEvents.splice(0, this._mapEvents.length);
    this.updateEvents(this._mapEvents);
  }

  invertEventsSelection() {
    for (let e of this._mapEvents) {
      e.selected = !e.selected;
    }

    this.updateEvents(this._mapEvents);
  }

  updateEvents(s: FdsnEventsResponseModels.EventExt[]) {
    this.selectedEvents.next(s);
  }

  updateFocusedEvent(e: FdsnEventsResponseModels.EventExt) {
    this.focusedEvent.next(e);
  }
}
