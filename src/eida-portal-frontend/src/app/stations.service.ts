import { Injectable, Input } from '@angular/core';
import { Subject, BehaviorSubject,  Observable } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { EidaService } from './eida.service';
import { EventsService } from './events.service';
import {
  FdsnNetwork, FdsnStation, FdsnStationExt, StationsModel, StationChannelModel
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

  // All networks
  public allNetworks = new Array<FdsnNetwork>();
  // Networks in the dropdown filtered on network type
  public filteredNetworks = new BehaviorSubject(new Array<FdsnNetwork>());

  // All stations
  public allStations = new Array<FdsnStationExt>();
  // Stations in the dropdown filtered on network type and network code + year
  public filteredStations: FdsnStationExt[];
  // Stations present in the working set
  public selectedStations = new BehaviorSubject(new Array<FdsnStationExt>());
  // Station focused on the map
  public focuedStation = new Subject<FdsnStationExt>();

  // Stations filtered to be added to the station working set
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
      const tmp = new FdsnStationExt();
      tmp.station_network_code = f.station_network_code;
      tmp.station_network_start_year = f.station_network_start_year;
      tmp.station_network_temporary = f.station_network_temporary;
      tmp.station_code = f.station_code;
      tmp.station_latitude = f.station_latitude;
      tmp.station_longitude = f.station_longitude;
      tmp.station_elevation = f.station_elevation;
      tmp.station_site_name = f.station_site_name;
      tmp.station_start_date = f.station_start_date;
      tmp.station_start_year = f.station_start_year;
      tmp.station_end_date = f.station_end_date;
      tmp.station_end_year = f.station_end_year;
      tmp.station_restricted_status = f.station_restricted_status;
      tmp.station_selected = true;
      this.allStations.push(tmp);
    }
  }

  addAllNetworks(nets: FdsnNetwork[]) {
    for (const n of nets) {
      const tmp = new FdsnNetwork();
      tmp.network_code = n.network_code;
      tmp.network_description = n.network_description;
      tmp.network_start_date = n.network_start_date;
      tmp.network_start_year = n.network_start_year;
      tmp.network_end_date = n.network_end_date;
      tmp.network_end_year = n.network_end_year;
      tmp.network_temporary = n.network_temporary;
      this.allNetworks.push(tmp);
    }
    this.networkTypeChanged(this.stationsModel.selectedNetworkType);
  }

  // Add filtered stations to the working set and skip the duplicates
  updateStations(filteredStations: FdsnStationExt[]) {
    for (const fs of filteredStations) {
      if (this.selectedStations.value.filter(
        e => (
          e.station_network_code === fs.station_network_code
          && e.station_code === fs.station_code
        )).length === 0) {
          this.selectedStations.value.push(fs);
        }
    }
    this.selectedStations.next(this.selectedStations.value);
  }

  refreshStations(stations: FdsnStationExt[]) {
    this.selectedStations.next(stations);
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

  networkTypeChanged(n) {
    this.stationsModel.selectedNetwork = 'All';
    this.stationsModel.selectedStation = 'All';

    if (n.id === 0) {
      this.filteredNetworks.next(this.allNetworks);
    } else if (n.id === 1) {
      this.filteredNetworks.next(this.allNetworks.filter(
        m => !m.network_temporary
      ));
    } else {
      this.filteredNetworks.next(this.allNetworks.filter(
        m => m.network_temporary
      ));
    }

    this.networkChanged();
  }

  /**
   * Triggered from stations tab when network combo value changes
   * @param n - String "All" or FdsnNetwork instance
   */
  networkChanged() {
    const n = this.stationsModel.selectedNetwork;
    if (n === 'All') {
      switch (this.stationsModel.selectedNetworkType.id) {
        // All networks
        case 0:
            this.filteredStations =
            this.allStations;
            break;
        // Permanent networks
        case 1:
            this.filteredStations =
            this.allStations.filter(
              s => !s.station_network_temporary
            );
            break;
        // Temporary networks
        case 2:
            this.filteredStations =
            this.allStations.filter(
              s => s.station_network_temporary
            );
            break;
      }
    } else {
      this.stationsModel.selectedNetwork = n;
      this.filteredStations = this.allStations.filter(
        s => s.station_network_code === n.network_code
        && s.station_network_start_year === n.network_start_year
      );
    }

    this.stationsModel.clearStationSelection();
    this.refreshAvailableStreams();
  }

  /**
   * Refresh availalbe streams for selected network / station
   */
  refreshAvailableStreams(): void {
    if (
      this.stationsModel.stationSelectionMethod
      !== Enums.StationSelectionMethods.Code
    ) {
      return;
    }

    this.getAvailableChannels(
      this.stationsModel.selectedNetwork.network_code,
      this.stationsModel.selectedNetwork.network_start_year,
      this.stationsModel.selectedStation.station_code,
      this.stationsModel.selectedNetworkType).subscribe(
        val => this.importStationChannels(val)
    );
  }

  importStationChannels(array): void {
    this.stationsModel.clearAvailableChannels();

    for (let a in array) {
      let s = new StationChannelModel();
      s.channel_code = a;
      s.channel_appearances = array[a];
      this.stationsModel.availableChannels.push(s);
    }
  }

  getStations(): Observable<FdsnStation[]> {
    return this._eidaService.http.get<FdsnStation[]>(this._stationsUrl).pipe(
        tap(_ => this._eidaService.log('fetched stations data')),
        catchError(this._eidaService.handleError('getStations', []))
      );
  }

  getAvailableChannels(net, netStartYear, stat, netType): Observable<Object> {
    let url = `${this._channelsUrl}?aggregate=1&`;

    if (net) {
      url += `station_network_code=${net}&`;
    }

    if (netStartYear) {
      url += `station_network_start_year=${netStartYear}&`;
    }

    if (netType) {
      url += `station_network_type=${netType.id}&`;
    }

    if (stat) {
      url += `station_code=${stat}`;
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
      if (sm.selectedNetworkType.id === 1) {
        this._filteredStations = this.allStations.filter(
          m => !m.station_network_temporary
        );
      } else if (sm.selectedNetworkType.id === 2) {
        this._filteredStations = this.allStations.filter(
          m => m.station_network_temporary
        );
      } else {
        // Handle sm.selectedNetworkType.id === 0
        this._filteredStations = this.allStations.filter(
          m => m.station_network_code
        );
      }

      // Add all networks or selected network based on the combo selection
      if (sm.selectedNetwork !== 'All') {
        this._filteredStations = this.selectedStations.value.concat(
          this.allStations.filter(
            m => m.station_network_code === sm.selectedNetwork.network_code
            && m.station_network_start_year === sm.selectedNetwork.network_start_year
          )
        );
      }

      // Station selection method-dependent
      if (sm.stationSelectionMethod === Enums.StationSelectionMethods.Code) {
        if (sm.selectedStation !== 'All') {
          this._filteredStations = this._filteredStations.filter(
            m => m.station_code === sm.selectedStation.station_code
          );
        }
      } else if (sm.stationSelectionMethod === Enums.StationSelectionMethods.Region) {
        this._filteredStations = this._filteredStations.filter(
          m => m.station_latitude >= sm.coordinateS
          && m.station_latitude <= sm.coordinateN
          && m.station_longitude >= sm.coordinateW
          && m.station_longitude <= sm.coordinateE
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
    this.selectedStations.value.find(
      p => p.station_network_code === s.station_network_code
      && p.station_code === s.station_code
    ).station_selected = !s.station_selected;
    this.refreshStations(this.selectedStations.value);
  }

  removeStationSelection(s: FdsnStation) {
    const i = this.selectedStations.value.indexOf(
      this.selectedStations.value.find(
        p => p.station_network_code === s.station_network_code
        && p.station_code === s.station_code
      )
    );
    this.selectedStations.value.splice(i, 1);
    this.refreshStations(this.selectedStations.value);
  }

  removeAllStations() {
    this.selectedStations.value.splice(0, this.selectedStations.value.length);
    this.refreshStations(this.selectedStations.value);
  }

  removeSelectedStations() {
    this.selectedStations.next(
      this.selectedStations.value.filter(e => e.station_selected !== true)
    );
    this.refreshStations(this.selectedStations.value);
  }

  invertStationsSelection() {
    for (const s of this.selectedStations.value) {
      s.station_selected = !s.station_selected;
    }

    this.refreshStations(this.selectedStations.value);
  }

  getNetworksStations(): Observable<FdsnNetwork[]> {
    return this._eidaService.http.get<FdsnNetwork[]>(this._networksStationsUrl)
      .pipe(
        tap(_ => this._eidaService.log('fetched networks and stations data')),
        catchError(this._eidaService.handleError('getNetworksStations', []))
      );
  }
}
