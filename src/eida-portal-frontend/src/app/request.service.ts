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
import * as JSZip from 'jszip';
import { saveAs } from 'file-saver';

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
    let urls = Array<string[]>();

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
      let t = this._getTimeWindow(e);
      url += `&${t}`;

      urls.push([`${e._publicID}.mseed`, url]);
    }

    this._saveToZip('event-data.zip', urls);
  }
  
  private _downloadMetadata(format: Enums.MetadataFormats): void {
    let urls = Array<string[]>();
    let filename = '';
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
          filename = 'metadata.xml'
          break;
        case Enums.MetadataFormats.Text:
          url = `${this._fedStationUrl}sta=${urlSta}&level=channel&format=text`;
          filename = 'metadata.txt';
          break;
        default:
          url = `${this._fedStationUrl}sta=${urlSta}`;
          filename = 'metadata';
          break;
      }
      urls.push([filename, url]);
      this._saveToZip(
        `station-metadata-${Enums.MetadataFormats[format]}.zip`,
        urls
      );
  }

  private _getTimeWindow(e: FdsnEventsResponseModels.EventExt): string {
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

  private _saveToZip(filename, urls): void {
    this._consoleService.add(`Downloading and packing: ${urls}`);
    const zip = new JSZip();
    const folder = zip.folder('data');
    urls.forEach((url) => {
      const blobPromise = fetch(url[1]).then(r => {
        if (r.status === 200) {
          return r.blob();
        }
        return Promise.reject(new Error(r.statusText))
      })
      const name = url[0];
      folder.file(name, blobPromise);
    })

    zip.generateAsync({ type: "blob" })
      .then(blob => saveAs(blob, filename))
      .catch(e => console.log(e));
  }
}
