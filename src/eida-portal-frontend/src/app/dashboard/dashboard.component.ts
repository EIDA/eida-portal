import { Component, OnInit } from '@angular/core';
import { ConsoleService } from '../console.service';
import { RequestService } from '../request.service';
import { UiService } from '../ui.service';
import { TextService } from '../text.service';
import * as swal from '../../assets/js/sweetalert/sweetalert.min.js';
import { Notification, EidaToken } from '../modules/models';
import { Enums } from '../modules/enums';

declare var $: any;
declare var Mousetrap: any;

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html'
})
export class DashboardComponent implements OnInit {
  constructor(
    public consoleService: ConsoleService,
    public uiService: UiService,
    public textService: TextService,
    private _requestService: RequestService
  ) {}

  ngOnInit() {
    this.consoleService.notifications.subscribe(n => this.notify(n));

    this._requestService.tokenTimeout.subscribe(t =>
      this._handleTokenTimeoutUpdate(t)
    );

    Mousetrap.bind('1', function(e) {
      $('#menuTabs')
        .find('li')
        .removeClass('is-active');
      $('tab-pane').prop('checked', false);
      $('#eventsTab').addClass('is-active');
      $('#events').prop('checked', true);
    });

    Mousetrap.bind('2', function(e) {
      $('#menuTabs')
        .find('li')
        .removeClass('is-active');
      $('tab-pane').prop('checked', false);
      $('#stationsTab').addClass('is-active');
      $('#stations').prop('checked', true);
    });

    Mousetrap.bind('3', function(e) {
      $('#menuTabs')
        .find('li')
        .removeClass('is-active');
      $('tab-pane').prop('checked', false);
      $('#requestTab').addClass('is-active');
      $('#request').prop('checked', true);
    });

    Mousetrap.bind('3', function(e) {
      $('#menuTabs')
        .find('li')
        .removeClass('is-active');
      $('tab-pane').prop('checked', false);
      $('#requestTab').addClass('is-active');
      $('#request').prop('checked', true);
    });

    Mousetrap.bind('4', function(e) {
      $('#menuTabs')
        .find('li')
        .removeClass('is-active');
      $('tab-pane').prop('checked', false);
      $('#metricsTab').addClass('is-active');
      $('#metrics').prop('checked', true);
    });

    Mousetrap.bind('5', function(e) {
      $('#menuTabs')
        .find('li')
        .removeClass('is-active');
      $('tab-pane').prop('checked', false);
      $('#helpTab').addClass('is-active');
      $('#help').prop('checked', true);
    });

    Mousetrap.bind(
      'm m',
      function() {
        this.toggleVisibility('mapToggler', 'mapContainer');
      }.bind(this.uiService)
    );

    Mousetrap.bind(
      'r r',
      function() {
        this.resetMapZoom(true);
      }.bind(this.uiService)
    );

    Mousetrap.bind(
      't t',
      function() {
        this.toggleTooltips('tooltipsToggler');
      }.bind(this.uiService)
    );
  }

  public attachEidaToken(t): void {
    if (!t) {
      return;
    }

    const file = t;
    this._requestService.parseToken(file);
  }

  public detachEidaToken(): void {
    this._requestService.parseToken(null);
    $('#tokenAttachButtonText').text('Attach EIDA Token');
  }

  private _handleTokenTimeoutUpdate(t: string): void {
    $('#tokenAttachButtonText').text(t);
  }

  tabSelected(s) {
    $('#menuTabs')
      .find('li')
      .removeClass('is-active');
    $(s).addClass('is-active');
  }

  notify(n: Notification) {
    switch (n.level) {
      case Enums.NotificationLevels.Undefined:
        break;
      case Enums.NotificationLevels.Info:
        swal('Information', n.message, 'info');
        break;
      case Enums.NotificationLevels.Warning:
        swal('Warning', n.message, 'warning');
        break;
      case Enums.NotificationLevels.Error:
        swal('Error', n.message, 'error');
        break;
    }
  }
}
