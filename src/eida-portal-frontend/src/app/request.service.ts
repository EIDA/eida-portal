import { Injectable, Input } from '@angular/core';
import { EventsService } from './events.service';
import { StationsService } from './stations.service';
import { RequestModel } from './modules/models';

@Injectable({
  providedIn: 'root'
})
export class RequestService {
  // Binding object for Request tab
  @Input() requestModel = new RequestModel();
  constructor(
    private _eventsService: EventsService,
    private _stationsService: StationsService
  ) { }
}
