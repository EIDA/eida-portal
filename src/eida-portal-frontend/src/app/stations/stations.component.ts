import { Component, OnInit } from '@angular/core';
import { Subject, Subscription } from 'rxjs';
import {
  StationsModel, StationChannelModel, FdsnNetwork, FdsnStationExt,
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

  private _channelSubscription: Subscription;

  constructor(
    private _consoleService: ConsoleService,
    private _mapService: MapService,
    public stationsService: StationsService,
    public textService: TextService) { }

  ngOnInit() {
    this.stationsService.getNetworks().subscribe(
      n => this.stationsService.addAllNetworks(n)
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
  networkChanged() {
    const n = this.stationsService.stationsModel.selectedNetwork;
    if (n === 'All') {
      switch (this.stationsService.stationsModel.selectedNetworkType.id) {
        case 0:
            this.filteredStations = this.stationsService.allStations;
            break;
        case 1:
            this.filteredStations = this.stationsService.allStations.filter(
              s => s.network_temporary === false
            );
            break;
        case 2:
            this.filteredStations = this.stationsService.allStations.filter(
              s => s.network_temporary === true
            );
            break;
      }
    } else {
      this.stationsService.stationsModel.selectedNetwork = n;
      this.filteredStations = this.stationsService.allStations.filter(
        s => s.network_code === n.code && s.network_start_year === n.start_year
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

  getAvailableChannels() {
    return this.stationsService.stationsModel.availableChannels;
  }

  getWorksetChannels(selected: boolean) {
    return this.stationsService.stationsModel.worksetChannels.filter(x => x.selected === selected);
  }

  handleChannelSelection(s) : void {
    this.stationsService.stationsModel.worksetChannels.find(
      e => e.channelCode === s.channelCode).selected = !s.selected;
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

    this.stationsService.getAvailableChannels(
      this.stationsService.stationsModel.selectedNetwork.code,
      this.stationsService.stationsModel.selectedNetwork.start_year,
      this.stationsService.stationsModel.selectedStation.code,
      this.stationsService.stationsModel.selectedNetworkType).subscribe(
        val => this.importStationChannels(val)
    );
  }

  importStationChannels(array): void {
    this.stationsService.stationsModel.clearAvailableChannels();

    for (let a in array) {
      let s = new StationChannelModel();
      s.channelCode = a;
      s.appearances = array[a];
      this.stationsService.stationsModel.availableChannels.push(s);
    }
  }

  /**
   * When stations in the rowking set change, refresh the station channels list
   */
  refreshWorksetStationChannels(): void {
    if (this._channelSubscription) {
      this._channelSubscription.unsubscribe();
    }
  
    this._channelSubscription = this.stationsService.getChannelsForWorkingSet(
      this.selectedStations.filter(n => n.selected === true)
    ).subscribe(
      result => this.importWorksetStationChannels(result)
    );
  }

  importWorksetStationChannels(array): void {
    this.stationsService.stationsModel.clearWorksetChannels();

    for (let a in array) {
      let s = new StationChannelModel();
      s.channelCode = a;
      s.appearances = array[a];
      this.stationsService.stationsModel.worksetChannels.push(s);
    }
  }

  stationDataSourceChanged(s: Enums.StationDataSource): void {
    this.stationsService.stationsModel.dataSource = s;
  }

  stationSelectionMethod(s: Enums.StationSelectionMethods): void {
    this.stationsService.stationsModel.stationSelectionMethod = s;
  }

  stationChannelSelectionMethod(s: Enums.stationChannelSelectionMethods): void {
    this.stationsService.stationsModel.channelSelectionMethod = s;
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

  handleChannelTabChange(btn: string, target: string): void {
    $('#channelsByCodeContent, #channelsBySamplingContent').hide();
    $('#channelsTabs').find('li').removeClass('is-active');
    $(`#${btn}`).addClass('is-active');
    $(`#${target}`).show("fast");
  }

  handleAvailableChannelsVisibility(v: boolean) {
    if (v) {
      $('#available-channels').show();
    } else {
      $('#available-channels').hide();
    }
  }
}
