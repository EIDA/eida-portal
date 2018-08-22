import { Component, OnInit, Input } from '@angular/core';
import { ConsoleService } from '../console.service';
import { StationsModel } from '../models'

@Component({
  selector: 'app-stations',
  templateUrl: './stations.component.html',
})
export class StationsComponent implements OnInit {
  @Input() stationsModel = new StationsModel();

  constructor(public consoleService: ConsoleService) { }

  ngOnInit() {
    this.consoleService.add('Stations initiated');
  }

  search() {
    this.consoleService.add('Stations/search clicked ' + this.stationsModel.toString())
  }

  reset() {
    this.stationsModel = new StationsModel();
    this.consoleService.add('Stations/reset clicked');
  }
}
