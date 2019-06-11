import { Component, OnInit } from '@angular/core';
import { Subject, Subscription } from 'rxjs';
import {
  StationsModel, StationStreamModel, FdsnNetwork, FdsnStationExt,
  MapDragBoxCoordinates
} from '../modules/models';
import { ConsoleService } from '../console.service';
import { StationsService } from '../stations.service';
import { MapService } from '../map.service';
import { TextService } from '../text.service';
import { PaginatorService } from '../paginator.service';
import { Enums } from '../modules/enums';

declare var $: any;

@Component({
  selector: 'app-stations',
  templateUrl: './stations.component.html',
})
export class StationsComponent implements OnInit {
  filteredStations: FdsnStationExt[];
  selectedStations = new Array<FdsnStationExt>();
  paginator = new PaginatorService();
  private searchTerms = new Subject<string>();

  private _streamSubscription: Subscription;

  constructor(
    private _consoleService: ConsoleService,
    private _mapService: MapService,
    public stationsService: StationsService,
    public textService: TextService) { }

  ngOnInit() {
    this.stationsService.getNetworks().subscribe(
      n => this.stationsService.allNetworks = n
    );
    this.stationsService.getStations().subscribe(
      s => this.stationsService.addAllStations(s)
    );

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
    this.stationsService.stationsModel.selectedNetwork = new FdsnNetwork();
  }

  allStations(): void {
    this.stationsService.stationsModel.selectedNetwork = new FdsnNetwork();
    this.stationsService.stationsModel.selectedStation = new FdsnStationExt();
    this.filteredStations = this.stationsService.allStations;
  }

  /**
   * Triggered from stations tab when network combo value changes
   * @param n - String "All" or FdsnNetwork instance
   */
  networkChanged(n) {
    if (n === 'All') {
      this.filteredStations = this.stationsService.allStations;
    } else {
      this.stationsService.stationsModel.selectedNetwork = n;
      this.filteredStations = this.stationsService.allStations.filter(
        s => s.net === n.code
      );
    }

    this.stationsService.stationsModel.clearStationSelection();
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
    this.stationsService.stationsModel.selectedStation = s;
    this.refreshAvailableStreams();    
  }

  getAvailableStreams() {
    return this.stationsService.stationsModel.availableStreams;
  }

  getWorksetStreams(selected: boolean) {
    return this.stationsService.stationsModel.worksetStreams.filter(x => x.selected === selected);
  }

  handleStreamSelection(s) : void {
    this.stationsService.stationsModel.worksetStreams.find(
      e => e.streamCode === s.streamCode).selected = !s.selected;
  }

  add() {
    $('#addButton').addClass('is-loading');
    this.stationsService.addSelectedStation(this.stationsService.stationsModel);
  }

  reset(): void {
    this.stationsService.stationsModel = new StationsModel();
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
    if ((this.stationsService.stationsModel.stationSelectionMethod !== Enums.StationSelectionMethods.Code)) {
      return;
    }

    this.stationsService.getAvailableStreams(
      this.stationsService.stationsModel.selectedNetwork.code,
      this.stationsService.stationsModel.selectedStation.stat).subscribe(
        val => this.importStationStreams(val)
    );
  }

  importStationStreams(array) : void {
    this.stationsService.stationsModel.clearAvailableStreams();

    for (let a in array) {
      let s = new StationStreamModel();
      s.streamCode = a;
      s.appearances = array[a];
      this.stationsService.stationsModel.availableStreams.push(s);
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
    this.stationsService.stationsModel.clearWorksetStreams();

    for (let a in array) {
      let s = new StationStreamModel();
      s.streamCode = a;
      s.appearances = array[a];
      this.stationsService.stationsModel.worksetStreams.push(s);
    }
  }

  stationDataSourceChanged(s: Enums.StationDataSource): void {
    this.stationsService.stationsModel.dataSource = s;
  }

  stationSelectionMethod(s: Enums.StationSelectionMethods): void {
    this.stationsService.stationsModel.stationSelectionMethod = s;
  }

  stationStreamSelectionMethod(s: Enums.StationStreamSelectionMethods): void {
    this.stationsService.stationsModel.streamSelectionMethod = s;
  }

  updateCoordinatesFromDragBox(mdbc: MapDragBoxCoordinates): void {
    this.stationsService.stationsModel.coordinateN = mdbc.coordN;
    this.stationsService.stationsModel.coordinateS = mdbc.coordS;
    this.stationsService.stationsModel.coordinateE = mdbc.coordE;
    this.stationsService.stationsModel.coordinateW = mdbc.coordW;
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
