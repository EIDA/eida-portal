import { Injectable } from '@angular/core';
import { catchError, map, tap } from 'rxjs/operators';
import { environment } from '../environments/environment';
import { EidaService } from './eida.service';
import { EventsModel, FdsnEventResponse } from './models';
import { Observable, Subject } from 'rxjs';
import { HttpClient, HttpHeaders, HttpClientModule } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class EventsService {
  public eventsResponse = new Subject<FdsnEventResponse>();

  constructor(
    private _eidaService: EidaService
  ) { }

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
}
