import { Injectable, Input } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../environments/environment';
import { ConsoleService } from './console.service';
import { EventsService } from './events.service';
import { StationsService } from './stations.service';
import { RequestModel } from './modules/models';
import { FdsnStationExt } from './modules/models';
import { FdsnEventsResponseModels } from './modules/models.fdsn-events';

@Injectable({
  providedIn: 'root'
})
export class RequestService {
  private _routingUrl = environment.routingUrl;
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

  public downloadMiniseed(): void {
    for (const s of this._stationsService.selectedStations.value) {
      const url = this.findDataselectSource(s);
    }
  }

  /**
   * Use Routing Service to find stations original DC
   */
  findDataselectSource(s: FdsnStationExt): string {
    return '';
  }
}
