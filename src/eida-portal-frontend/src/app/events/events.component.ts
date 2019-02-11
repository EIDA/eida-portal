import { Component, OnInit, Input } from '@angular/core';
import { ConsoleService } from '../console.service';
import { MapService } from '../map.service';
import { EventsModel } from '../models';
import { EventsService } from '../events.service';
import { TextService } from '../text.service';
import { MapDragBoxCoordinates } from '../models';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
})
export class EventsComponent implements OnInit {
  @Input() eventsModel = new EventsModel();
  
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
    let result = this._eventsService.getEvents(this.eventsModel);
    console.log(result);
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
