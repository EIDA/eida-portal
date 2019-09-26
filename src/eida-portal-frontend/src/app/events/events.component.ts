import { Component, OnInit, Input } from '@angular/core';
import { ConsoleService } from '../console.service';
import { MapService } from '../map.service';
import { EventsService } from '../events.service';
import { EventsModel, MapDragBoxCoordinates, ProgressNotification } from '../modules/models';
import { TextService } from '../text.service';
import { FdsnEventsResponseModels } from '../modules/models.fdsn-events';
import { PaginatorService } from '../paginator.service';
import { Enums } from '../modules/enums';

declare var $: any;

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html'
})
export class EventsComponent implements OnInit {
  paginator = new PaginatorService();

  constructor(
    private _mapService: MapService,
    private _consoleService: ConsoleService,
    public eventsService: EventsService,
    public textService: TextService
  ) {}

  ngOnInit() {
    this._mapService.dragBoxCoordinates.subscribe(s =>
      this.updateCoordinatesFromDragBox(s)
    );

    this.eventsService.selectedEvents.subscribe(n =>
      this.updateSelectedEventsTable(n)
    );

    this.eventsService.progressReporter.subscribe(n =>
      this._handleProgressBar(n)
    );
  }

  search() {
    $('#searchButton').addClass('is-loading');
    this.eventsService.getEvents(this.eventsService.eventsModel);
  }

  reset() {
    this.eventsService.eventsModel = new EventsModel();
    this._consoleService.add('Events/reset clicked');
  }

  updateCoordinatesFromDragBox(mdbc: MapDragBoxCoordinates): void {
    this.eventsService.eventsModel.coordinateN = mdbc.coordN;
    this.eventsService.eventsModel.coordinateS = mdbc.coordS;
    this.eventsService.eventsModel.coordinateE = mdbc.coordE;
    this.eventsService.eventsModel.coordinateW = mdbc.coordW;
  }

  updateSelectedEventsTable(e: FdsnEventsResponseModels.EventExt[]) {
    this.refreshPaginator();
    $('#searchButton').removeClass('is-loading');
  }

  refreshPaginator(): void {
    this.paginator.paginate(this.eventsService.selectedEvents.value);
    this.paginator.getPages();
  }

  focusOnEvent(e: FdsnEventsResponseModels.EventExt) {
    this.eventsService.updateFocusedEvent(e);
  }

  removeAllEvents(): void {
    this.eventsService.removeAllEvents();
  }

  removeSelectedEvents(): void {
    this.eventsService.removeSelectedEvents();
  }

  countSelectedEvents(): number {
    return this.eventsService.selectedEvents.value.filter(
      e => e.selected === true
    ).length;
  }

  invertEventsSelection(): void {
    this.eventsService.invertEventsSelection();
  }

  private _handleProgressBar(p: ProgressNotification): void {
    if (p.completed) {
      $('#searchButton').removeClass('is-loading');
      this._consoleService.addNotification(
        Enums.NotificationLevels.Error,
        'Something went wrong! Please use console (F12) to see the details.'
      );
    }
  }
}
