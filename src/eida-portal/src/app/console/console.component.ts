import { Component, OnInit } from '@angular/core';
import { ConsoleService } from '../console.service';

@Component({
  selector: 'app-console',
  templateUrl: './console.component.html',
})
export class ConsoleComponent implements OnInit {

  constructor(public consoleService: ConsoleService) { }

  ngOnInit() {
    this.consoleService.add('Console initiated');
  }

}
