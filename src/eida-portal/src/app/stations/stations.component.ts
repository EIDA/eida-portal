import { Component, OnInit, Input } from '@angular/core';
import { ConsoleService } from '../console.service';
import { StationsModel } from '../models'
import { StationsService } from '../stations.service';
import { FdsnNetwork, FdsnStation } from '../models'

@Component({
  selector: 'app-stations',
  templateUrl: './stations.component.html',
})
export class StationsComponent implements OnInit {
  @Input() stationsModel = new StationsModel();
  networks: FdsnNetwork[];

  constructor(private stationsService: StationsService,
    public consoleService: ConsoleService) {
      this.stationsService.getNetworks().subscribe(
        ns => this.networks = ns
      )
    }

  ngOnInit() {
    this.consoleService.add('Stations initiated');
  }

  search() {
    this.consoleService.add('Stations/search clicked >>> ' + this.stationsModel.toString())
  }

  reset() : void {
    this.stationsModel = new StationsModel();
    this.consoleService.add('Stations/reset clicked');
  }
}
