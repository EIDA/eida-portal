import { Component, OnInit, Input } from '@angular/core';
import { Observable, of, Subject } from 'rxjs';
import {
  debounceTime, distinctUntilChanged, switchMap
} from 'rxjs/operators';

import { StationsModel } from '../models';
import { ConsoleService } from '../console.service';
import { StationsService } from '../stations.service';
import { FdsnNetwork, FdsnStationExt } from '../models';
import { PaginatorService } from '../paginator.service';

declare var $: any;

@Component({
  selector: 'app-stations',
  templateUrl: './stations.component.html',
})
export class StationsComponent implements OnInit {
  @Input() stationsModel = new StationsModel();
  
  filteredStations: FdsnStationExt[];
  selectedStations = new Array<FdsnStationExt>();
  networks_search$: Observable<FdsnNetwork[]>;
  paginator = new PaginatorService();
  private searchTerms = new Subject<string>();

  constructor(
    private stationsService: StationsService,
    public consoleService: ConsoleService) { }

  ngOnInit() {
    this.stationsService.getNetworks().subscribe(
      n => this.stationsService.allNetworks = n
    );
    this.stationsService.getStations().subscribe(
      s => this.stationsService.addAllStations(s)
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
    this.stationsModel.selectedNetwork = new FdsnNetwork();
  }

  allStations(): void {
    this.stationsModel.selectedNetwork = new FdsnNetwork();
    this.stationsModel.selectedStation = new FdsnStationExt();
    this.filteredStations = this.stationsService.allStations;
  }

  networkChanged(n) {
    if (n === 'All') {
      this.filteredStations = this.stationsService.allStations;
    } else {
      this.stationsModel.selectedNetwork = n;
      this.filteredStations = this.stationsService.allStations.filter(
        s => s.net === n.code
      );
    }
  }

  updateSelectedStationsTable(s: FdsnStationExt[]) {
    this.selectedStations = s;
    this.refreshPaginator();
  }

  focusOnStation(s: FdsnStationExt) {
    this.stationsService.updateFocusedStation(s);
  }

  stationChanged(s) {
    this.stationsModel.selectedStation = s;
  }

  add() {
    this.stationsService.addSelectedStation(this.stationsModel);
  }

  reset(): void {
    this.stationsModel = new StationsModel();
  }

  removeAllStations(): void {
    this.stationsService.removeAllStations();
  }

  refreshPaginator(): void {
    this.paginator.paginate(this.selectedStations);
    this.paginator.getPages();
    // $('#previousPageButton').attr('disabled', true);
  }
}
