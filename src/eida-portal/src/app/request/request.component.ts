import { Component, OnInit } from '@angular/core';
import { ConsoleService } from '../console.service';

@Component({
  selector: 'app-request',
  templateUrl: './request.component.html',
})
export class RequestComponent implements OnInit {

  constructor(public consoleService: ConsoleService) { }

  ngOnInit() {
    this.consoleService.add('Request initiated');
  }

}
