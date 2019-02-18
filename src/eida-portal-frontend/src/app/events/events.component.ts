import { Component, OnInit, Input } from '@angular/core';
import { ConsoleService } from '../console.service';
import { MapService } from '../map.service';
import { EventsModel, MapDragBoxCoordinates } from '../modules/models';
import { FdsnEventsResponseModels } from '../modules/models.fdsn-events';
import { EventsService } from '../events.service';
import { TextService } from '../text.service';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
})
export class EventsComponent implements OnInit {
  @Input() eventsModel = new EventsModel();
  public fdsnResponse;
  
  constructor(
    private _mapService: MapService,
    private _eventsService: EventsService,
    public consoleService: ConsoleService,
    public textService: TextService) { }

  ngOnInit() {
    this._mapService.dragBoxCoordinates.subscribe(
      s => this.updateCoordinatesFromDragBox(s)
    );

    this.consoleService.add('Events initiated');
  }

  search() {
    this._eventsService.getEvents(this.eventsModel);
  }

  reset() {
    this.eventsModel = new EventsModel();
    this.consoleService.add('Events/reset clicked');
  }

  updateCoordinatesFromDragBox(mdbc: MapDragBoxCoordinates): void {
    this.eventsModel.coordinateN = mdbc.coordN;
    this.eventsModel.coordinateS = mdbc.coordS;
    this.eventsModel.coordinateE = mdbc.coordE;
    this.eventsModel.coordinateW = mdbc.coordW;
  }

}
