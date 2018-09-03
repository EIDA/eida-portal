import { Component, OnInit, Input } from '@angular/core';
import { ConsoleService } from '../console.service';
import { EventsModel } from '../models'

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
})
export class EventsComponent implements OnInit {
  @Input() eventsModel = new EventsModel();

  constructor(public consoleService: ConsoleService) { }

  ngOnInit() {
    this.consoleService.add('Events initiated');
  }

  search() {
    this.consoleService.add('Events/search clicked >>> ' + this.eventsModel.toString());
  }

  reset() {
    this.eventsModel = new EventsModel();
    this.consoleService.add('Events/reset clicked');
  }

}
