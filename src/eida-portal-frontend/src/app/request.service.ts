import { Injectable, Input } from '@angular/core';
import { Subject } from 'rxjs';
import { environment } from '../environments/environment';
import { ConsoleService } from './console.service';
import { EventsService } from './events.service';
import { StationsService } from './stations.service';
import { RequestModel } from './modules/models';
import { ProgressBar } from './modules/models';
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
  public progressReporter = new Subject<ProgressBar>();

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
    const urls = Array<{}>();

    const selectedChannels = this._stationsService.stationsModel.getSelectedChannels();
    const allChannelsSelected = this._stationsService.stationsModel.allChannelsSelected();

    for (const e of this._eventsService.selectedEvents.value.filter(n => n.selected === true)) {
      let urlSta = null;
      let urlChannel = null;

      const selectedStations = this._stationsService.selectedStations.value.filter(n => n.station_selected === true);

      // Check if there are stations selected and
      // create a comma-separated list of them for the URL query
      if (selectedStations.length > 0) {
        urlSta = Object.keys(selectedStations).map(k => selectedStations[k].code).join(',');
      }

      // Check if there are channels selected and create a comma-separated
      // list of them for the URL query Add question mark on at the end of
      // channel code to include all channel components
      if (!allChannelsSelected && selectedChannels.length > 0) {
        urlChannel = Object.keys(selectedChannels)
          .map(k => selectedChannels[k].channelCode + '?')
          .join(',');
      }

      // Build the url to get data
      let url = '';
      if (urlSta) {
        url = `${this._fedDataselectUrl}sta=${urlSta}`;
      }

      if (!allChannelsSelected) {
        url += `&channel=${urlChannel}`;
      }

      // Get the time window based on event
      const t = this._getTimeWindow(e);
      url += `&${t}`;

      urls.push({'filename': `${e._publicID}.mseed`, 'url': url});
    }

    this._saveToZip('event-data.zip', urls);
  }

  private _downloadMetadata(format: Enums.MetadataFormats): void {
    const urls = Array<{}>();
    let filename = '';
    let urlSta = null;

    // Check if there are stations selected and
    // create a comma-separated list of them for the URL query
    if (this._stationsService.selectedStations.value.filter(n => n.station_selected === true).length > 0) {
      urlSta = Object.keys(
        this._stationsService.selectedStations.value.filter(n => n.station_selected === true)
      ).map(k => this._stationsService.selectedStations.value[k].code).join(',');
    }

    let url = '';
    switch (format) {
      case Enums.MetadataFormats.StationXML:
        url = `${this._fedStationUrl}sta=${urlSta}&level=channel&format=xml`;
        filename = 'metadata.xml';
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
    urls.push({'filename': filename, 'url': url});
    this._saveToZip(
      `station-metadata-${Enums.MetadataFormats[format]}.zip`,
      urls
    );
  }

  private _getTimeWindow(e: FdsnEventsResponseModels.EventExt): string {
    const dh = new DateHelper();

    switch (this.requestModel.timeWindowSelectionMode) {
      case Enums.RequestTimeWindowSelectionModes.Absolute:
        const momentStart = dh.getDate(e.origin.time.value);
        const momentEnd = dh.getDate(e.origin.time.value);

        const startTime = momentStart.add(
          -this.requestModel.absoluteModeStart, 'minutes'
        ).format('YYYY-MM-DDTHH:mm:ss');

        const endTime = momentEnd.add(
          this.requestModel.absoluteModeEnd, 'minutes'
        ).format('YYYY-MM-DDTHH:mm:ss');

        return `starttime=${startTime}&endtime=${endTime}`;
      case Enums.RequestTimeWindowSelectionModes.Relative:
        return;
    }
  }

  private _saveToZip(filename, urls): void {
    this._consoleService.add(`Downloading and packing: ${JSON.stringify(urls)}`);
    const zip = new JSZip();
    const folder = zip.folder('data');
    this.reportProgress(null, null, false, true);
    let progressCount = 1;

    urls.forEach((url) => {
      const blobPromise = fetch(url.url).then(r => {
        if (r.status === 200) {
          this.reportProgress(progressCount++, urls.length);
          return r.blob();
        }
        this.reportProgress(null, null, true, null, r.statusText);
        return Promise.reject(new Error(r.statusText));
      });
      const name = url.filename;
      folder.file(name, blobPromise);
    });

    zip.generateAsync({ type: 'blob' })
      .then(blob => {
        this.reportProgress(null, null, true);
        saveAs(blob, filename);
      })
      .catch(e => console.log(e));
  }

  /**
   * Report the download progress to the listeners
   * @param dividend {number} Dividend
   * @param divisor {number} Divisor
   * @param completed {boolean} True for completer, false otherwise
   * @param indeterminate {boolean} True if progress is uknown, false otherwise
   * @param message {string} Message to be rendered on the screen
   */
  reportProgress(dividend, divisor, completed = false, indeterminate = false, message = ''): void {
    const pb = new ProgressBar();
    pb.dividend = dividend;
    pb.divisor = divisor;
    pb.completed = completed;
    pb.indeterminate = indeterminate;
    pb.message = message;
    this.progressReporter.next(pb);
  }
}
