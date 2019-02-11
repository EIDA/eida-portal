import { Injectable } from '@angular/core';
import { catchError, map, tap } from 'rxjs/operators';
import { environment } from '../environments/environment';
import { EidaService } from './eida.service';
import { EventsModel, FdsnEventResponse } from './models';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EventsService {
  public allEvents = new FdsnEventResponse();

  constructor(
    private _eidaService: EidaService
  ) { }

  getEvents(e: EventsModel): Observable<FdsnEventResponse> {
    let url = this.buildEventsUrl(e);
    return this._eidaService.http.get<FdsnEventResponse>(url)
      .pipe(
        tap(_ => this._eidaService.log('fetched events data')),
        catchError(this._eidaService.handleError('getEvents', []))
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
    `&minlat=${e.coordinateW}` +
    `&maxlat=${e.coordinateE}` +
    `&minlon=${e.coordinateS}` +
    `&maxlon=${e.coordinateN}` +
    `&limit=${e.resultLimit}`;
  }
}
