import { Component, OnInit, Input } from '@angular/core';
import { Observable, of, Subject } from 'rxjs';
import {
  debounceTime, distinctUntilChanged, switchMap
} from 'rxjs/operators';

import { StationsModel } from '../models'
import { ConsoleService } from '../console.service';
import { StationsService } from '../stations.service';
import { MapService } from '../map.service'
import { FdsnNetwork, FdsnStation } from '../models'

@Component({
  selector: 'app-stations',
  templateUrl: './stations.component.html',
})
export class StationsComponent implements OnInit {
  @Input() stationsModel = new StationsModel();
  networks: FdsnNetwork[];
  stations: FdsnStation[];
  filteredStations: FdsnStation[];
  selectedStations: FdsnStation[];
  networks_search$: Observable<FdsnNetwork[]>;
  private searchTerms = new Subject<string>();

  constructor(
    private stationsService: StationsService,
    public consoleService: ConsoleService) { }

  ngOnInit() {
    this.stationsService.getNetworks().subscribe(
      n => this.networks = n
    );
    this.stationsService.getStations().subscribe(
      s => this.stations = s
    );

    this.consoleService.add('Stations initiated');

    this.networks_search$ = this.searchTerms.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap((term: string) => this.stationsService.searchNetwork(term)),
    );

    this.stationsService.selectedStations.subscribe(
      s => this.updateSelectedStationsTable(s)
    );
  }

  search_network(term: string): void {
    this.searchTerms.next(term);
  }

  allNetworks(): void {
    this.stationsModel.selectedNetwork = null;
  }

  allStations(): void {
    this.stationsModel.selectedNetwork = new FdsnNetwork();
    this.stationsModel.selectedStation = new FdsnStation();
    this.filteredStations = this.stations;
  }

  networkChanged(n) {
    if (n === 'All') {
      this.filteredStations = this.stations.filter(
        s => s.net
      )
    } else {
      this.filteredStations = this.stations.filter(
        s => s.net === n.code
      );
    }
  }

  updateSelectedStationsTable(s: FdsnStation[]) {
    this.selectedStations = s;
  }

  focusOnStation(s: FdsnStation) {
    this.stationsService.updateFocusedStation(s);
  }

  stationChanged(s) {
    this.stationsModel.selectedStation = s;
  }

  search() {
    this.stationsService.addSelectedStation(this.stationsModel.selectedStation);
  }

  reset(): void {
    this.stationsModel = new StationsModel();
    this.consoleService.add('Stations/reset clicked');
  }
}
