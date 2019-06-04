import { Injectable, Input } from '@angular/core';
import { environment } from '../environments/environment';
import { ConsoleService } from './console.service';
import { EventsService } from './events.service';
import { StationsService } from './stations.service';
import { RequestModel } from './modules/models';
import { FdsnStationExt } from './modules/models';
import { FdsnEventsResponseModels } from './modules/models.fdsn-events';
import { Enums } from './modules/enums';
import { DateHelper } from './helpers/date.helper';

@Injectable({
  providedIn: 'root'
})
export class RequestService {
  private _fedDataselectUrl = environment.federatorDataselectUrl;
  private _fedStationUrl = environment.federatorStationUrl;

  // Binding object for Request tab
  @Input() requestModel = new RequestModel();
  constructor(
    private _consoleService: ConsoleService,
    private _eventsService: EventsService,
    private _stationsService: StationsService
  ) { }

  public log(message: string) {
    this._consoleService.add(`RequestService: ${message}`);
  }

  public download(): void {
    switch (this.requestModel.selectedFdsnRequestType) {
      case this.requestModel.fdsnRequestTypes[0]:
        // Waveform (Mini-SEED)
        this._downloadMiniSeed();
        return;
      case this.requestModel.fdsnRequestTypes[1]:
        // Metadata (StationXML)
        this._downloadMetadata(Enums.MetadataFormats.StationXML);
        return;
      case this.requestModel.fdsnRequestTypes[2]:
        // Metadata (Text)
        this._downloadMetadata(Enums.MetadataFormats.Text);
        return;
      default:
        return;
    }
  }

  private _downloadMiniSeed(): void {
    let urls = Array<string>();

    let selectedStreams = this._stationsService.stationsModel.getSelectedStreams();
    let allStreamsSelected = this._stationsService.stationsModel.allStreamsSelected();

    for (let e of this._eventsService.selectedEvents.value) {
      let urlSta = null;
      let urlStream = null;

      // Check if there are stations selected and
      // create a comma-separated list of them for the URL query
      if (this._stationsService.selectedStations.value.length > 0) {
        urlSta = Object.keys(this._stationsService.selectedStations.value)
          .map(k => this._stationsService.selectedStations.value[k].stat)
          .join(',');
      }

      // Check if there are streams selected and create a comma-separated
      // list of them for the URL query Add question mark on at the end of
      // stream code to include all stream components
      if (!allStreamsSelected && selectedStreams.length > 0) {
        urlStream = Object.keys(selectedStreams)
          .map(k => selectedStreams[k].streamCode + '?')
          .join(',');
      }

      // Build the url to get data
      let url = '';
      if (urlSta) {
        url = `${this._fedDataselectUrl}sta=${urlSta}`;
      }

      if (!allStreamsSelected) {
        url += `&channel=${urlStream}`;
      }

      // Get the time window based on event
      let t = this.getTimeWindow(e);
      url += `&${t}`;

      urls.push(url);
      window.open(url);
    }
    
    console.log(urls);
  }

  getTimeWindow(e: FdsnEventsResponseModels.EventExt): string {
    let dh = new DateHelper();

    switch (this.requestModel.timeWindowSelectionMode) {
      case Enums.RequestTimeWindowSelectionModes.Absolute:
        let momentStart = dh.getDate(e.origin.time.value);
        let momentEnd = dh.getDate(e.origin.time.value);

        let startTime = momentStart.add(
          -this.requestModel.absoluteModeStart, 'minutes'
        ).format("YYYY-MM-DDTHH:mm:ss");

        let endTime = momentEnd.add(
          this.requestModel.absoluteModeEnd, 'minutes'
        ).format("YYYY-MM-DDTHH:mm:ss");

        return `starttime=${startTime}&endtime=${endTime}`;
      case Enums.RequestTimeWindowSelectionModes.Relative:
        return;
    }
  }

  
  private _downloadMetadata(format: Enums.MetadataFormats): void {
    let urlSta = null;

      // Check if there are stations selected and
      // create a comma-separated list of them for the URL query
      if (this._stationsService.selectedStations.value.length > 0) {
        urlSta = Object.keys(this._stationsService.selectedStations.value)
          .map(k => this._stationsService.selectedStations.value[k].stat)
          .join(',');
      }

      let url = '';
      switch (format) {
        case Enums.MetadataFormats.StationXML:
          url = `${this._fedStationUrl}sta=${urlSta}&level=channel&format=xml`;
          break;
        case Enums.MetadataFormats.Text:
          url = `${this._fedStationUrl}sta=${urlSta}&level=channel&format=text`;
          break;
        default:
          url = `${this._fedStationUrl}sta=${urlSta}`;
          break;
      }
      window.open(url);

    console.log(url);
  }
}
