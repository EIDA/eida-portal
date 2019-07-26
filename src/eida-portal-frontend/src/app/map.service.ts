import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { MapDragBoxCoordinates } from "./modules/models";

@Injectable({
  providedIn: "root"
})
export class MapService {
  public dragBoxCoordinates = new Subject<MapDragBoxCoordinates>();
  public mapResizeTrigger = new Subject<boolean>();
  public mapZoomResetTrigger = new Subject<boolean>();

  constructor() {}

  updateDragBoxCoordinates(dbc: MapDragBoxCoordinates) {
    this.dragBoxCoordinates.next(dbc);
  }

  updateDragBoxCoordinatesByArray(a) {
    const dbc = new MapDragBoxCoordinates();
    dbc.coordN = a[0];
    dbc.coordS = a[1];
    dbc.coordE = a[2];
    dbc.coordW = a[3];
    this.dragBoxCoordinates.next(dbc.getRounded());
  }

  triggerMapResize(value: boolean): void {
    this.mapResizeTrigger.next(value);
  }

  triggerZoomReset(value: boolean): void {
    this.mapZoomResetTrigger.next(value);
  }
}
