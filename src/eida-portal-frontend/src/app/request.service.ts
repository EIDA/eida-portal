import { Injectable, Input } from '@angular/core';
import { Subject, BehaviorSubject } from 'rxjs';

import { ConsoleService } from './console.service';
import { EventsService } from './events.service';
import { StationsService } from './stations.service';
import { RequestModel, StationChannelModel, EidaToken } from './modules/models';
import { ProgressNotification } from './modules/models';
import { FdsnEventsResponseModels } from './modules/models.fdsn-events';
import { Enums } from './modules/enums';
import { DateHelper } from './helpers/date.helper';
import * as JSZip from 'jszip';
import { saveAs } from 'file-saver';
import { distinct } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class RequestService {
  public progressReporter = new Subject<ProgressNotification>();
  public eidaToken = new BehaviorSubject(new EidaToken());
  public tokenTimeout = new Subject<string>();
  public tokenAuthenticated = new Subject<boolean>();

  // Binding object for Request tab
  @Input() requestModel = new RequestModel();
  constructor(
    private _consoleService: ConsoleService,
    public eventsService: EventsService,
    public stationsService: StationsService
  ) {}

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

    const selectedChannels = this.stationsService.stationsModel.getSelectedChannels();
    const allChannelsSelected = this.stationsService.stationsModel.allChannelsSelected();

    switch (this.requestModel.timeWindowSelectionMode) {
      case Enums.RequestTimeWindowSelectionModes.Absolute:
        urls.push(
          this._prepareMiniseedUrl(null, allChannelsSelected, selectedChannels)
        );
        break;
      case Enums.RequestTimeWindowSelectionModes.Relative:
        for (const e of this.eventsService.selectedEvents.value.filter(
          n => n.selected === true
        )) {
          urls.push(
            this._prepareMiniseedUrl(e, allChannelsSelected, selectedChannels)
          );
        }
        break;
    }

    this._saveToZip('event-data.zip', urls);
  }

  private _prepareMiniseedUrl(
    e: FdsnEventsResponseModels.EventExt,
    allChannelsSelected: boolean,
    selectedChannels: StationChannelModel[],
    filename: string = 'data'
  ): {} {
    let body = '';
    let channels = '*';

    const selectedStations = this.stationsService.selectedStations.value.filter(
      n => n.station_selected === true
    );

    const t = this._getTimeWindow(e);

    if (!allChannelsSelected) {
      channels = Object.keys(selectedChannels)
        .map(k => selectedChannels[k].channel_code + '*')
        .join(',');
    }

    for (const s of selectedStations) {
      body += `${s.station_network_code} ${s.station_code} * ${channels} ${t}\n`;
    }

    return {
      filename: `${filename}.mseed`,
      url: this.requestModel.selectedFdsnDataSource.dataselectUrl,
      body: body
    };
  }

  private _downloadMetadata(format: Enums.MetadataFormats): void {
    const urls = Array<{}>();

    switch (this.requestModel.timeWindowSelectionMode) {
      case Enums.RequestTimeWindowSelectionModes.Absolute:
        urls.push(this._prepareMetadataUrl(null, format));
        break;
      case Enums.RequestTimeWindowSelectionModes.Relative:
        for (const e of this.eventsService.selectedEvents.value.filter(
          n => n.selected === true
        )) {
          urls.push(this._prepareMetadataUrl(e, format));
        }
        break;
    }

    this._saveToZip(
      `station-metadata-${Enums.MetadataFormats[format]}.zip`,
      urls
    );
  }

  private _prepareMetadataUrl(
    e: FdsnEventsResponseModels.EventExt,
    format: Enums.MetadataFormats
  ) {
    let body = '';
    let filename = '';

    // Check if there are stations selected and
    // create a comma-separated list of them for the URL query
    if (
      this.stationsService.selectedStations.value.filter(
        n => n.station_selected === true
      ).length <= 0
    ) {
      return;
    }

    switch (format) {
      case Enums.MetadataFormats.StationXML:
        body += `level=channel\nformat=xml\n`;
        filename = 'metadata.xml';
        break;
      case Enums.MetadataFormats.Text:
        body += `level=channel\nformat=text\n`;
        filename = 'metadata.txt';
        break;
      default:
        filename = 'metadata';
        break;
    }

    const t = this._getTimeWindow(e);

    for (const s of this.stationsService.selectedStations.value.filter(
      n => n.station_selected === true
    )) {
      body += `${s.station_network_code} ${s.station_code} * * ${t}\n`;
    }

    return {
      filename: filename,
      url: this.requestModel.selectedFdsnDataSource.stationUrl,
      body: body
    };
  }

  private _getTimeWindow(e: FdsnEventsResponseModels.EventExt): string {
    const dh = new DateHelper();

    switch (this.requestModel.timeWindowSelectionMode) {
      case Enums.RequestTimeWindowSelectionModes.Absolute:
        const relativeMomentStart = dh
          .getDate(this.requestModel.absoluteModeFrom)
          .format('YYYY-MM-DDTHH:mm:ss');
        const relativeMomentEnd = dh
          .getDate(this.requestModel.absoluteModeTo)
          .format('YYYY-MM-DDTHH:mm:ss');
        return `${relativeMomentStart} ${relativeMomentEnd}`;
      case Enums.RequestTimeWindowSelectionModes.Relative:
        const absoluteMomentStart = dh.getDate(e.origin.time.value);
        const absoluteMomentEnd = dh.getDate(e.origin.time.value);

        const absoluteStartTime = absoluteMomentStart
          .add(-this.requestModel.relativeModeStart, 'minutes')
          .format('YYYY-MM-DDTHH:mm:ss');

        const absoluteEndTime = absoluteMomentEnd
          .add(this.requestModel.relativeModeEnd, 'minutes')
          .format('YYYY-MM-DDTHH:mm:ss');

        return `${absoluteStartTime} ${absoluteEndTime}`;
    }
  }

  private _saveToZip(filename, urls): void {
    this._consoleService.add(
      `Downloading and packing: ${JSON.stringify(urls)}`
    );
    const zip = new JSZip();
    const folder = zip.folder('data');
    this.reportProgress(null, null, false, true);
    let progressCount = 1;

    urls.forEach(url => {
      const blobPromise = fetch(url.url, {
        method: 'POST',
        body: url.body
      }).then(r => {
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

    zip
      .generateAsync({ type: 'blob' })
      .then(blob => {
        this.reportProgress(null, null, true);
        saveAs(blob, filename);
      })
      .catch(e => this.reportProgress(null, null, true, false, e));
  }

  /**
   * Report the download progress to the listeners
   * @param dividend {number} Dividend
   * @param divisor {number} Divisor
   * @param completed {boolean} True for completer, false otherwise
   * @param indeterminate {boolean} True if progress is uknown, false otherwise
   * @param message {string} Message to be rendered on the screen
   */
  reportProgress(
    dividend,
    divisor,
    completed = false,
    indeterminate = false,
    message = ''
  ): void {
    const pb = new ProgressNotification();
    pb.dividend = dividend;
    pb.divisor = divisor;
    pb.completed = completed;
    pb.indeterminate = indeterminate;
    pb.message = message;
    this.progressReporter.next(pb);
  }

  public parseToken(file): void {
    if (!file) {
      this.eidaToken.next(null);
      this.tokenAuthenticated.next(false);
      return;
    }

    const et = new EidaToken();
    et.file = file;
    const fr = new FileReader();

    fr.onload = (e) => {
      et.text = fr.result;
      try {
        et.meta = JSON.parse(et.text.split('\n')[4]);
      } catch (error) {
        this._consoleService.addNotification(
          Enums.NotificationLevels.Error,
          `Following error occured when parsing the token: ${error.message}`
        );
        return;
      }

      this.eidaToken.next(et);
      this.tokenAuthenticated.next(true);

      const intervalId = setInterval(function() {
        // When the token is detached, stop the interval
        if (!this.eidaToken.value) {
          clearInterval(intervalId);
        }
        // Get today's date and time
        const dt = new DateHelper();
        const now: any = dt.now();
        const valid_until: any = dt.getDate(this.eidaToken.value.meta.valid_until);

        // Find the distance between now and the count down date
        const distance: number = valid_until - now;

        if (distance <= 0) {
          this.tokenAuthenticated.next(false);
          this.tokenTimeout.next(`EIDA Token has expired!`);
          clearInterval(intervalId);
          return;
        }

        // Time calculations for days, hours, minutes and seconds
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor(
          (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
        );
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        this.tokenTimeout.next(
          `Token lifespan: ${days} days, ${hours} hours, ${minutes} minutes, ${seconds} seconds`
        );
      }.bind(this), 1000);
    };
    fr.readAsText(file);
  }
}
