import { Component, OnInit } from '@angular/core';
import { ConsoleService } from '../console.service';
import { UiService } from '../ui.service';

declare var $: any;
declare var Mousetrap: any;

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
})
export class DashboardComponent implements OnInit {

  constructor(
    public consoleService: ConsoleService,
    public uiService: UiService
  ) { }

  ngOnInit() {
    this.consoleService.add('Dashboard initiated');

    Mousetrap.bind('1', function(e) {
      $('#menuTabs').find('li').removeClass('is-active');
      $('tab-pane').prop('checked', false);
      $('#eventsTab').addClass('is-active');
      $('#events').prop('checked', true);
    });

    Mousetrap.bind('2', function(e) {
      $('#menuTabs').find('li').removeClass('is-active');
      $('tab-pane').prop('checked', false);
      $('#stationsTab').addClass('is-active');
      $('#stations').prop('checked', true);
    });

    Mousetrap.bind('3', function(e) {
      $('#menuTabs').find('li').removeClass('is-active');
      $('tab-pane').prop('checked', false);
      $('#requestTab').addClass('is-active');
      $('#request').prop('checked', true);
    });

    Mousetrap.bind('3', function(e) {
      $('#menuTabs').find('li').removeClass('is-active');
      $('tab-pane').prop('checked', false);
      $('#requestTab').addClass('is-active');
      $('#request').prop('checked', true);
    });

    Mousetrap.bind('4', function(e) {
      $('#menuTabs').find('li').removeClass('is-active');
      $('tab-pane').prop('checked', false);
      $('#metricsTab').addClass('is-active');
      $('#metrics').prop('checked', true);
    });
  }

  tabSelected(s) {
    $('#menuTabs').find('li').removeClass('is-active');
    $(s).addClass('is-active');
  }
}
