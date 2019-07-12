import { Injectable, Input } from '@angular/core';
import { Subject, BehaviorSubject,  Observable } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { EidaService } from './eida.service';
import { EventsService } from './events.service';
import {
  FdsnNetwork, FdsnStation, FdsnStationExt, StationsModel
} from './modules/models';
import { environment } from '../environments/environment';
import { Enums } from './modules/enums';
import { GisHelper } from './helpers/gis.helper';
import { HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class StationsService {
  // Binding object for stations tab
  @Input() stationsModel = new StationsModel();
  public allNetworks: FdsnNetwork[];
  public allStations = new Array<FdsnStationExt>();
  public selectedStations = new BehaviorSubject(new Array<FdsnStationExt>());
  public focuedStation = new Subject<FdsnStationExt>();
  private _mapStations = new Array<FdsnStationExt>();
  private _filteredStations = new Array<FdsnStationExt>();

  constructor(
    private _eidaService: EidaService,
    private _eventsService: EventsService
  ) { }

  private _networksUrl = environment.networksUrl;
  private _stationsUrl = environment.stationsUrl;
  private _channelsUrl = environment.channelsUrl;
  private _networksStationsUrl = environment.networksStationsUrl;

  addAllStations(fs: FdsnStation[]) {
    for (const f of fs) {
      let tmp = new FdsnStationExt();
      tmp.network_code = f.network_code;
      tmp.network_start_year = f.network_start_year;
      tmp.code = f.code;
      tmp.latitude = f.latitude;
      tmp.longitude = f.longitude;
      tmp.elevation = f.elevation;
      tmp.site_name = f.site_name;
      tmp.start_date = f.start_date;
      tmp.start_year = f.start_year;
      tmp.end_date = f.end_date;
      tmp.end_year = f.end_year;
      tmp.restricted_status = f.restricted_status;
      tmp.selected = true;
      this.allStations.push(tmp);
    }
  }

  // Add filtered stations to the working set and skip the duplicates
  updateStations(filteredStations: FdsnStationExt[]) {
    for (const fs of filteredStations) {
      if (this._mapStations.filter(
        e => (e.network_code === fs.network_code && e.code === fs.code)).length === 0) {
          this._mapStations.push(fs);
      }
    }
    this.selectedStations.next(this._mapStations);
  }

  refreshStations(mapStations: FdsnStationExt[]) {
    this.selectedStations.next(mapStations);
  }

  updateFocusedStation(s: FdsnStationExt) {
    this.focuedStation.next(s);
  }

  getNetworks(): Observable<FdsnNetwork[]> {
    return this._eidaService.http.get<FdsnNetwork[]>(this._networksUrl).pipe(
        tap(_ => this._eidaService.log('fetched networks data')),
        catchError(this._eidaService.handleError('getNetworks', []))
      );
  }

  getStations(): Observable<FdsnStation[]> {
    return this._eidaService.http.get<FdsnStation[]>(this._stationsUrl).pipe(
        tap(_ => this._eidaService.log('fetched stations data')),
        catchError(this._eidaService.handleError('getStations', []))
      );
  }

  getAvailableChannels(net: string, netStartYear: string, stat: string): Observable<Object> {
    let url = `${this._channelsUrl}?aggregate=1&`;

    if (net) {
      url += `netcode=${net}&`;
    }

    if (netStartYear) {
      url += `netstartyear=${netStartYear}&`;
    }

    if (stat) {
      url += `statcode=${stat}`;
    }

    return this._eidaService.http.get<Object>(url).pipe(
      tap(_ => this._eidaService.log(`fetched channels data: ${net}/${stat}`)),
      catchError(this._eidaService.handleError('getAvailableChannels', []))
    );
  }

  getChannelsForWorkingSet(st: FdsnStationExt[]) {
    return this._eidaService.http.post(
      this._channelsUrl,
      JSON.stringify(st),
      {
        headers: new HttpHeaders().set('Content-Type', 'application/json')
      }
    ).pipe(
      tap(_ => this._eidaService.log('fetched workset streams data')),
      catchError(this._eidaService.handleError('getStreamsForWorkingSet', []))
    );
  }

  // Add selected station(s) to map and notify subscribers
  addSelectedStation(sm: StationsModel) {
    if (sm.dataSource === Enums.StationDataSource.Inventory) {
      // Inventory based search

      // All all networks or selected network based on the combo selection
      if (sm.selectedNetwork === 'All') {
        this._filteredStations = this.allStations.filter(m => m.network_code);
      } else {
        this._filteredStations = this._mapStations.concat(this.allStations.filter(
          m => m.network_code === sm.selectedNetwork.code
          && m.network_start_year === sm.selectedNetwork.start_year
        ));
      }

      // Station selection method-dependent
      if (sm.stationSelectionMethod === Enums.StationSelectionMethods.Code) {
        if (sm.selectedStation !== 'All') {
          this._filteredStations = this._filteredStations.filter(
            m => m.code === sm.selectedStation.stat
          );
        }
      } else if (sm.stationSelectionMethod === Enums.StationSelectionMethods.Region) {
        this._filteredStations = this._filteredStations.filter(
          m => m.latitude >= sm.coordinateS
          && m.latitude <= sm.coordinateN
          && m.longitude >= sm.coordinateW
          && m.longitude <= sm.coordinateE
        );
      } else if (sm.stationSelectionMethod === Enums.StationSelectionMethods.Events) {
        for (let i = this._filteredStations.length - 1; i >= 0; i--) {
          if (!this._stationHasEvent(this._filteredStations[i], sm)) {
            this._filteredStations.splice(i, 1);
          }
        }
      }


    } else if (sm.dataSource === Enums.StationDataSource.File) {
      // TODO: uploaded file containing station catalog
    }

    this.updateStations(this._filteredStations);
  }

  _stationHasEvent(s: FdsnStationExt, sm: StationsModel): boolean {
    let event = null;
    for (const e of this._eventsService.selectedEvents.getValue()) {
      const distance = GisHelper.coordinatesToDistance(e.origin, s);
      const bearing = GisHelper.coordinatesToAzimuth(e.origin, s);

      if (!(distance < sm.eventDistanceFrom
        || distance > sm.eventDistanceTo
        || bearing < sm.eventAzimuthFrom
        || bearing > sm.eventAzimuthTo)) {
        event = e;
        break;
      }
    }

    if (event) {
      return true;
    } else {
      return false;
    }
  }

  toggleStationSelection(s: FdsnStationExt) {
    this._mapStations.find(
      p => p.network_code === s.network_code && p.code === s.code
    ).selected = !s.selected;
    this.refreshStations(this._mapStations);
  }

  removeStationSelection(s: FdsnStation) {
    const i = this._mapStations.indexOf(
      this._mapStations.find(p => p.network_code === s.network_code && p.code === s.code)
    );
    this._mapStations.splice(i, 1);
    this.refreshStations(this._mapStations);
  }

  removeAllStations() {
    this._mapStations.splice(0, this._mapStations.length);
    this.refreshStations(this._mapStations);
  }

  removeSelectedStations() {
    this._mapStations = this._mapStations.filter(e => e.selected !== true);
    this.refreshStations(this._mapStations);
  }

  invertStationsSelection() {
    for (const s of this._mapStations) {
      s.selected = !s.selected;
    }

    this.refreshStations(this._mapStations);
  }

  getNetworksStations(): Observable<FdsnNetwork[]> {
    return this._eidaService.http.get<FdsnNetwork[]>(this._networksStationsUrl)
      .pipe(
        tap(_ => this._eidaService.log('fetched networks and stations data')),
        catchError(this._eidaService.handleError('getNetworksStations', []))
      );
  }
}
