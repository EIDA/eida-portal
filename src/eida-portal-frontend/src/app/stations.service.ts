import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { EidaService } from './eida.service';
import { FdsnNetwork, FdsnStation, FdsnStationExt, StationsModel } from './models';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class StationsService {
  public allNetworks: FdsnNetwork[];
  public allStations = new Array<FdsnStationExt>();
  public selectedStations = new Subject<FdsnStationExt[]>();
  public focuedStation = new Subject<FdsnStationExt>();
  private _mapStations = new Array<FdsnStationExt>();

  constructor(
    private eidaService: EidaService
  ) { }

  private networksUrl = environment.networksUrl;
  private stationsUrl = environment.stationsUrl;
  private networksStationsUrl = environment.networksStationsUrl;

  addAllStations(fs: FdsnStation[]) {
    for (let f of fs) {
      let tmp = new FdsnStationExt();
      tmp.net = f.net;
      tmp.stat = f.stat;
      tmp.lat = f.lat;
      tmp.lon = f.lon;
      tmp.elev = f.elev;
      tmp.name = f.name;
      tmp.start = f.start;
      tmp.end = f.end;
      tmp.selected = true;
      this.allStations.push(tmp);
    }
  }

  updateStations(s: FdsnStationExt[]) {
    this.selectedStations.next(s);
  }

  updateFocusedStation(s: FdsnStationExt) {
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
      this._mapStations = this.allStations.filter(m => m.net);
    } else if (s.selectedStation !== 'All'
      && this._mapStations.find(
        m => m.net === s.selectedStation.net && m.stat === s.selectedStation.stat)) {
      return;
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

  toggleStationSelection(s: FdsnStationExt) {
    this._mapStations.find(
      p => p.net === s.net && p.stat === s.stat
    ).selected = !s.selected;
    this.updateStations(this._mapStations);
  }

  removeStationSelection(s: FdsnStation) {
    let i = this._mapStations.indexOf(
      this._mapStations.find(p => p.net === s.net && p.stat === s.stat)
    );
    this._mapStations.splice(i, 1);
    this.updateStations(this._mapStations);
  }

  removeAllStations() {
    this._mapStations.splice(0, this._mapStations.length);
    this.updateStations(this._mapStations);
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