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
    this.stationsService.filteredStations = this.stationsService.allStations;
  }

  /**
   * Triggered from stations service when workset changes
   * @param s - Array of FdsnStationExt objects
   */
  updateSelectedStationsTable(s: FdsnStationExt[]) {
    this.refreshPaginator();
    this.stationsService.refreshAvailableStreams();
    $('#addButton').removeClass('is-loading');
  }

  focusOnStation(s: FdsnStationExt) {
    this.stationsService.updateFocusedStation(s);
  }

  stationChanged(s): void {
    this.stationsService.stationsModel.selectedStation = s;
    this.stationsService.refreshAvailableStreams();
  }

  getAvailableChannels() {
    return this.stationsService.stationsModel.availableChannels;
  }

  getWorksetChannels(selected: boolean) {
    return this.stationsService.stationsModel.worksetChannels.filter(
      x => x.channel_selected === selected
    );
  }

  handleChannelSelection(s) : void {
    this.stationsService.stationsModel.worksetChannels.find(
      e => e.channel_code === s.channel_code
    ).channel_selected = !s.channel_selected;
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
    return this.stationsService.selectedStations.value.filter(
      e => e.station_selected === true
    ).length;
  }

  invertStationsSelection(): void {
    this.stationsService.invertStationsSelection();
  }

  refreshPaginator(): void {
    this.paginator.paginate(this.stationsService.selectedStations.value);
    this.paginator.getPages();
    this.refreshWorksetStationChannels();
    // $('#previousPageButton').attr('disabled', true);
  }

  /**
   * When stations in the rowking set change, refresh the station channels list
   */
  refreshWorksetStationChannels(): void {
    if (this._channelSubscription) {
      this._channelSubscription.unsubscribe();
    }
  
    this._channelSubscription = this.stationsService.getChannelsForWorkingSet(
      this.stationsService.selectedStations.value.filter(
        n => n.station_selected === true
      )
    ).subscribe(
      result => this.importWorksetStationChannels(result)
    );
  }

  importWorksetStationChannels(array): void {
    this.stationsService.stationsModel.clearWorksetChannels();

    for (let a in array) {
      let s = new StationChannelModel();
      s.channel_code = a;
      s.channel_appearances = array[a];
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
