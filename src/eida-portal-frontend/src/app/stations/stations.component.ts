import { Component, OnInit, Input } from '@angular/core';
import { Observable, of, Subject, Subscription } from 'rxjs';
import {
  debounceTime, distinctUntilChanged, switchMap
} from 'rxjs/operators';

import {
  StationsModel, StationStreamModel, FdsnNetwork, FdsnStationExt, MapDragBoxCoordinates
} from '../modules/models';
import { ConsoleService } from '../console.service';
import { StationsService } from '../stations.service';
import { RequestService } from '../request.service';
import { MapService } from '../map.service';
import { TextService } from '../text.service';
import { PaginatorService } from '../paginator.service';
import { Timestamp } from 'rxjs/internal/operators/timestamp';
import { Enums } from '../modules/enums';

declare var $: any;
declare var Mousetrap: any;

@Component({
  selector: 'app-stations',
  templateUrl: './stations.component.html',
})
export class StationsComponent implements OnInit {
  @Input() stationsModel = new StationsModel();
  
  filteredStations: FdsnStationExt[];
  selectedStations = new Array<FdsnStationExt>();
  // networks_search$: Observable<FdsnNetwork[]>;
  paginator = new PaginatorService();
  private searchTerms = new Subject<string>();

  private _streamSubscription: Subscription;

  constructor(
    private _consoleService: ConsoleService,
    private _mapService: MapService,
    private _requestService: RequestService,
    public stationsService: StationsService,
    public textService: TextService) { }

  ngOnInit() {
    this.stationsService.getNetworks().subscribe(
      n => this.stationsService.allNetworks = n
    );
    this.stationsService.getStations().subscribe(
      s => this.stationsService.addAllStations(s)
    );

    // this.networks_search$ = this.searchTerms.pipe(
    //   debounceTime(300),
    //   distinctUntilChanged(),
    //   switchMap((term: string) => this.stationsService.searchNetwork(term)),
    // );

    this.stationsService.selectedStations.subscribe(
      s => this.updateSelectedStationsTable(s)
    );

    this._mapService.dragBoxCoordinates.subscribe(
      s => this.updateCoordinatesFromDragBox(s)
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

    this.stationsModel.clearStationSelection();
    this.refreshAvailableStreams();
  }

  /**
   * Triggered from stations service when workset changes
   * @param s - Array of FdsnStationExt objects
   */
  updateSelectedStationsTable(s: FdsnStationExt[]) {
    this.selectedStations = s;
    this.refreshPaginator();
    this.refreshAvailableStreams();
    $('#addButton').removeClass('is-loading');
  }

  focusOnStation(s: FdsnStationExt) {
    this.stationsService.updateFocusedStation(s);
  }

  stationChanged(s): void {
    this.stationsModel.selectedStation = s;
    this.refreshAvailableStreams();    
  }

  getAvailableStreams() {
    return this.stationsModel.availableStreams;
  }

  getWorksetStreams(selected: boolean) {
    return this.stationsModel.worksetStreams.filter(x => x.selected === selected);
  }

  handleStreamSelection(s) : void {
    this.stationsModel.worksetStreams.find(
      e => e.streamCode === s.streamCode).selected = !s.selected;
  }

  add() {
    $('#addButton').addClass('is-loading');
    this.stationsService.addSelectedStation(this.stationsModel);
  }

  reset(): void {
    this.stationsModel = new StationsModel();
  }

  removeAllStations(): void {
    this.stationsService.removeAllStations();
    this.refreshWorksetStationChannels();
  }

  removeSelectedStations(): void {
    this.stationsService.removeSelectedStations();
    this.refreshWorksetStationChannels();
  }

  countSelectedStations(): number {
    return this.selectedStations.filter(e => e.selected === true).length;
  }

  invertStationsSelection(): void {
    this.stationsService.invertStationsSelection();
  }

  refreshPaginator(): void {
    this.paginator.paginate(this.selectedStations);
    this.paginator.getPages();
    this.refreshWorksetStationChannels();
    // $('#previousPageButton').attr('disabled', true);
  }

  /**
   * Refresh availalbe streams for selected network / station
   */
  refreshAvailableStreams(): void {
    if ((this.stationsModel.stationSelectionMethod !== Enums.StationSelectionMethods.Code)) {
      return;
    }

    this.stationsService.getAvailableStreams(
      this.stationsModel.selectedNetwork.code,
      this.stationsModel.selectedStation.stat).subscribe(
        val => this.importStationStreams(val)
    );
  }

  importStationStreams(array) : void {
    this.stationsModel.clearAvailableStreams();

    for (let a in array) {
      let s = new StationStreamModel();
      s.streamCode = a;
      s.appearances = array[a];
      this.stationsModel.availableStreams.push(s);
    }
  }

  /**
   * When stations in the rowking set change, refresh the station channels list
   */
  refreshWorksetStationChannels(): void {
    if (this._streamSubscription) {
      this._streamSubscription.unsubscribe();
    }
    
    this._streamSubscription = this.stationsService.getStreamsForWorkingSet(
      this.selectedStations.filter(n => n.selected === true)
    ).subscribe(
      result => this.importWorksetStationChannels(result)
    );
  }

  importWorksetStationChannels(array): void {
    this.stationsModel.clearWorksetStreams();

    for (let a in array) {
      let s = new StationStreamModel();
      s.streamCode = a;
      s.appearances = array[a];
      this.stationsModel.worksetStreams.push(s);
    }
  }

  stationDataSourceChanged(s: Enums.StationDataSource): void {
    this.stationsModel.dataSource = s;
  }

  stationSelectionMethod(s: Enums.StationSelectionMethods): void {
    this.stationsModel.stationSelectionMethod = s;
  }

  stationStreamSelectionMethod(s: Enums.StationStreamSelectionMethods): void {
    this.stationsModel.streamSelectionMethod = s;
  }

  updateCoordinatesFromDragBox(mdbc: MapDragBoxCoordinates): void {
    this.stationsModel.coordinateN = mdbc.coordN;
    this.stationsModel.coordinateS = mdbc.coordS;
    this.stationsModel.coordinateE = mdbc.coordE;
    this.stationsModel.coordinateW = mdbc.coordW;
  }

  handleGeneralInputTypeChange(btn: string, target: string): void {
    $('#browseInventoryContent, #userSuppliedContent').hide();
    $('#dataSourceTabs').find('li').removeClass('is-active');
    $(`#${btn}`).addClass('is-active');
    $(`#${target}`).show("fast");
  }

  handleStationsTabChange(btn: string, target: string): void {
    $('#stationsByCodeContent, #stationsByRegionContent, #stationsByEventsContent').hide();
    $('#stationsTabs').find('li').removeClass('is-active');
    $(`#${btn}`).addClass('is-active');
    $(`#${target}`).show("fast");
  }

  handleStreamsTabChange(btn: string, target: string): void {
    $('#streamsByCodeContent, #streamsBySamplingContent').hide();
    $('#streamsTabs').find('li').removeClass('is-active');
    $(`#${btn}`).addClass('is-active');
    $(`#${target}`).show("fast");
  }
}
