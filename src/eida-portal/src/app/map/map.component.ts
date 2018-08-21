import { Component, OnInit } from '@angular/core';
import { ConsoleService } from '../console.service';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
})
export class MapComponent implements OnInit {

  constructor(public consoleService: ConsoleService) { }

  ngOnInit() {
    this.consoleService.add('Map initiated');
  }

}
