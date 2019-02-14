import { Component, OnInit, Input } from '@angular/core';
import { ConsoleService } from '../console.service';
import { MapService } from '../map.service';
import { EventsModel, MapDragBoxCoordinates } from '../modules/models';
import { FdsnEventsResponseModels } from '../modules/models.fdsn-events';
import { EventsService } from '../events.service';
import { TextService } from '../text.service';
import { Parser } from 'xml2js';
import { SerializationHelper } from '../helpers/serialization.helper';

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

    this._eventsService.eventsResponse.subscribe(
      n => this.eventsXmlToJson(n)
    );
  }

  search() {
    this._eventsService.getEvents(this.eventsModel);
  }

  reset() {
    this.eventsModel = new EventsModel();
    this.consoleService.add('Events/reset clicked');
  }

  eventsXmlToJson(resp) {
    let p = new Parser();
    p.parseString(resp, function(err, result) {
      if (err) {throw err;}
      let json = JSON.parse(JSON.stringify(result));
      let objGraph = SerializationHelper.eventsJsonToObjGraph(json);
      // TODO: 
    });
  }

  updateCoordinatesFromDragBox(mdbc: MapDragBoxCoordinates): void {
    this.eventsModel.coordinateN = mdbc.coordN;
    this.eventsModel.coordinateS = mdbc.coordS;
    this.eventsModel.coordinateE = mdbc.coordE;
    this.eventsModel.coordinateW = mdbc.coordW;
  }

}
