import { Component, OnInit } from '@angular/core';
import { ConsoleService } from '../console.service';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
})
export class EventsComponent implements OnInit {

  constructor(public consoleService: ConsoleService) { }

  ngOnInit() {
    this.consoleService.add('Events initiated');
  }

  search() {
    this.consoleService.add('Events/search clicked');
  }

  reset() {
    this.consoleService.add('Events/reset clicked');
  }

}
