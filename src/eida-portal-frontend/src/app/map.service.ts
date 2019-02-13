import { Injectable } from '@angular/core';
import { EidaService } from './eida.service';
import { Subject ,  Observable, of } from 'rxjs';
import { MapDragBoxCoordinates } from './modules/models';

@Injectable({
  providedIn: 'root'
})
export class MapService {
  public dragBoxCoordinates = new Subject<MapDragBoxCoordinates>();

  constructor() { }

  updateDragBoxCoordinates(dbc: MapDragBoxCoordinates) {
    this.dragBoxCoordinates.next(dbc);
  }

  updateDragBoxCoordinatesByArray(a) {
    let dbc = new MapDragBoxCoordinates();
    dbc.coordN = a[0];
    dbc.coordS = a[1];
    dbc.coordE = a[2];
    dbc.coordW = a[3];
    this.dragBoxCoordinates.next(dbc.getRounded());
  }
}
