import { Component, OnInit, Input } from '@angular/core';
import { ConsoleService } from '../console.service';
import { MapService } from '../map.service';
import { EventsModel, MapDragBoxCoordinates } from '../modules/models';
import { EventsService } from '../events.service';
import { TextService } from '../text.service';
import { FdsnEventsResponseModels } from '../modules/models.fdsn-events';
import { PaginatorService } from '../paginator.service';

declare var $: any;

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
})
export class EventsComponent implements OnInit {
  @Input() eventsModel = new EventsModel();
  paginator = new PaginatorService();
  selectedEvents = new Array<FdsnEventsResponseModels.Event>();
  
  constructor(
    private _mapService: MapService,
    public eventsService: EventsService,
    public consoleService: ConsoleService,
    public textService: TextService) { }

  ngOnInit() {
    this._mapService.dragBoxCoordinates.subscribe(
      s => this.updateCoordinatesFromDragBox(s)
    );

    this.consoleService.add('Events initiated');

    this.eventsService.selectedEvents.subscribe(
      n => this.updateSelectedEventsTable(n)
    );
  }

  search() {
    $('#searchButton').addClass('is-loading');
    this.eventsService.getEvents(this.eventsModel);
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

  updateSelectedEventsTable(e: FdsnEventsResponseModels.EventExt[]) {
    this.selectedEvents = e;
    this.refreshPaginator();
    $('#searchButton').removeClass('is-loading');
  }

  refreshPaginator(): void {
    this.paginator.paginate(this.selectedEvents);
    this.paginator.getPages();
  }

  focusOnEvent(e: FdsnEventsResponseModels.EventExt) {
    this.eventsService.updateFocusedEvent(e);
  }

  removeAllEvents(): void {
    this.eventsService.removeAllEvents();
  }

}
