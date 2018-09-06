import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { EidaService } from './eida.service';
import { FdsnNetwork, FdsnStation, StationsModel } from './models';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class StationsService {
  public allNetworks: FdsnNetwork[];
  public allStations: FdsnStation[];
  public selectedStations = new Subject<FdsnStation[]>();
  public focuedStation = new Subject<FdsnStation>();
  private _mapStations = new Array<FdsnStation>();

  constructor(
    private eidaService: EidaService
  ) { }

  private networksUrl = environment.networksUrl;
  private stationsUrl = environment.stationsUrl;
  private networksStationsUrl = environment.networksStationsUrl;

  updateStations(s: FdsnStation[]) {
    this.selectedStations.next(s);
  }

  updateFocusedStation(s: FdsnStation) {
    this.focuedStation.next(s);
  }

  getNetworks(): Observable<FdsnNetwork[]> {
    return this.eidaService.http.get<FdsnNetwork[]>(this.networksUrl)
      .pipe(
        tap(_ => this.eidaService.log('fetched networks data')),
        catchError(this.eidaService.handleError('getNetworks', []))
      );
  }

  getStations(): Observable<FdsnStation[]> {
    return this.eidaService.http.get<FdsnStation[]>(this.stationsUrl)
      .pipe(
        tap(_ => this.eidaService.log('fetched stations data')),
        catchError(this.eidaService.handleError('getStations', []))
      );
  }

  // Add selected station(s) to map and notify subscribers
  addSelectedStation(s: StationsModel) {
    if (s.selectedNetwork === 'All' && s.selectedStation === 'All') {
      this._mapStations = this.allStations;
    } else if (s.selectedStation !== 'All'
      && !this._mapStations.find(
        m => m.net === s.selectedStation.net && m.stat === s.selectedStation.stat)) {
      this._mapStations.push(s.selectedStation);
    } else {
      for (let st of this.allStations.filter(m => m.net === s.selectedNetwork.code)) {
        if (!this._mapStations.find(x => x.net === st.net && x.stat === st.stat)) {
          this._mapStations.push(st);
        }
      }
    }
    this.updateStations(this._mapStations);
  }

  removeStation(s: FdsnStation) {
    this.eidaService.log('Remove station station service clicked');
  }

  searchNetwork(term: string): Observable<FdsnNetwork[]> {
    if (!term.trim()) {
      return of([]);
    }
    return this.eidaService.http.get<FdsnNetwork[]>(this.networksUrl)
      .pipe(
        tap(_ => this.eidaService.log(`found heroes matching "${term}"`)),
        catchError(this.eidaService.handleError<FdsnNetwork[]>('searchNetwork', []))
      );
  }

  getNetworksStations(): Observable<FdsnNetwork[]> {
    return this.eidaService.http.get<FdsnNetwork[]>(this.networksStationsUrl)
      .pipe(
        tap(_ => this.eidaService.log('fetched networks and stations data')),
        catchError(this.eidaService.handleError('getNetworksStations', []))
      );
  }

}