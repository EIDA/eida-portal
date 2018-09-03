import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

import { EidaService } from './eida.service';
import { StationsModel } from './models'

@Injectable({
  providedIn: 'root'
})
export class MapService {
  public stations = new Subject<StationsModel>();

  constructor(private eidaService: EidaService) { }

  updateStations(s: StationsModel) {
    this.stations.next(s);
  }
}
