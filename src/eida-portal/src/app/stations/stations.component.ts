import { Component, OnInit, Input } from '@angular/core';
import { ConsoleService } from '../console.service';
import { StationsModel } from '../models'
import { StationsService } from '../stations.service';

@Component({
  selector: 'app-stations',
  templateUrl: './stations.component.html',
})
export class StationsComponent implements OnInit {
  @Input() stationsModel = new StationsModel();

  constructor(private stationsService: StationsService,
    public consoleService: ConsoleService) { }

  ngOnInit() {
    this.consoleService.add('Stations initiated');
  }

  search() {
    this.consoleService.add('Stations/search clicked >>> ' + this.stationsModel.toString())
  }

  reset() : void {
    this.stationsModel = new StationsModel();
    this.consoleService.add('Stations/reset clicked');
    this.stationsService.getNetworks();
  }
}
