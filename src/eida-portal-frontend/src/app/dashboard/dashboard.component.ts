import { Component, OnInit } from '@angular/core';
import { ConsoleService } from '../console.service';

declare var jquery: any;
declare var $: any;

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
})
export class DashboardComponent implements OnInit {

  constructor(public consoleService: ConsoleService) { }

  ngOnInit() {
    this.consoleService.add('Dashboard initiated');
  }

  tabSelected(s) {
    $('li').removeClass('is-active');
    $(s).addClass('is-active');
  }

}
