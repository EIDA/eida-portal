import { Component, OnInit, Input } from '@angular/core';
import { Observable, of, Subject } from 'rxjs';
import {
  debounceTime, distinctUntilChanged, switchMap
} from 'rxjs/operators';
import { ConsoleService } from '../console.service';
import { StationsModel } from '../models'
import { StationsService } from '../stations.service';
import { FdsnNetwork, FdsnStation } from '../models'

@Component({
  selector: 'app-stations',
  templateUrl: './stations.component.html',
})
export class StationsComponent implements OnInit {
  @Input() stationsModel = new StationsModel();
  networks: FdsnNetwork[];
  stations: FdsnStation[];
  _filteredStations: FdsnStation[];
  networks_search$: Observable<FdsnNetwork[]>;
  private searchTerms = new Subject<string>();

  constructor(
    private stationsService: StationsService,
    public consoleService: ConsoleService) {
      this.stationsService.getNetworks().subscribe(
        n => this.networks = n
      )
      this.stationsService.getStations().subscribe(
        s => this.stations = s
      )
    }

  ngOnInit() {
    this.consoleService.add('Stations initiated');

    this.networks_search$ = this.searchTerms.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap((term: string) => this.stationsService.searchNetwork(term)),
    );
  }

  get filteredStations(): FdsnStation[] {
    if (this.stationsModel.selectedNetwork) {
      return this._filteredStations;
    } else {
      return this.stations;
    }
  }

  search_network(term: string): void {
    this.searchTerms.next(term);
  }

  search() {
    this.consoleService.add(
      'Stations/search clicked >>> ' + this.stationsModel.toString()
    )
  }

  allNetworks() : void {
    this.stationsModel.selectedNetwork = null;
  }

  allStations() : void {
    this.stationsModel.selectedStation = new FdsnStation();
  }

  networkChanged(n) {
    this._filteredStations = this.stations.filter(
      s => s.net === n.code
    );
  }

  reset() : void {
    this.stationsModel = new StationsModel();
    this.consoleService.add('Stations/reset clicked');
  }
}
