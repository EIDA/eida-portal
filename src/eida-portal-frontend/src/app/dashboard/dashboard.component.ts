import { Component, OnInit } from '@angular/core';
import { ConsoleService } from '../console.service';

declare var $: any;
declare var Mousetrap: any;

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
})
export class DashboardComponent implements OnInit {

  constructor(public consoleService: ConsoleService) { }

  ngOnInit() {
    this.consoleService.add('Dashboard initiated');

    Mousetrap.bind('1', function(e) {
      $('li').removeClass('is-active');
      $('tab-pane').prop('checked', false);
      $('#eventsTab').addClass('is-active');
      $('#events').prop('checked', true);
    });

    Mousetrap.bind('2', function(e) {
      $('li').removeClass('is-active');
      $('tab-pane').prop('checked', false);
      $('#stationsTab').addClass('is-active');
      $('#stations').prop('checked', true);
    });

    Mousetrap.bind('3', function(e) {
      $('li').removeClass('is-active');
      $('tab-pane').prop('checked', false);
      $('#requestTab').addClass('is-active');
      $('#request').prop('checked', true);
    });
  }

  tabSelected(s) {
    $('li').removeClass('is-active');
    $(s).addClass('is-active');
  }

  toggleVisibility(toggler, target) {
    if ($(`#${toggler}`).hasClass('fa-toggle-on')) {
      $(`#${toggler}`).removeClass('fa-toggle-on').addClass('fa-toggle-off')
    } else {
      $(`#${toggler}`).removeClass('fa-toggle-off').addClass('fa-toggle-on')
    }
    $(`#${target}`).toggle("fast");
  }
}
