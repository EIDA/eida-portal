import { Component, OnInit } from '@angular/core';
import { ConsoleService } from '../console.service';

declare var $: any;
declare var Mousetrap: any;
declare var tippy: any;

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
})
export class DashboardComponent implements OnInit {

  constructor(public consoleService: ConsoleService) { }

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

  toggleVisibility(toggler, target, speed=250) {
    if ($(`#${toggler}`).hasClass('fa-toggle-on')) {
      $(`#${toggler}`).removeClass('fa-toggle-on').addClass('fa-toggle-off')
    } else {
      $(`#${toggler}`).removeClass('fa-toggle-off').addClass('fa-toggle-on')
      // When switching off the map, resizing the window enough to enable
      // mobile experience, going back full screen and enabling the map
      // does not make it pop-up because the display property is set to 'none'.
      $(`#${target}`).find('canvas').css("display", "block");
    }
    $(`#${target}`).toggle(speed);
  }

  toggleTooltips(toggler) {
    let elements = [];

      $('[data-tippy-content]').each(function() {
        if (!this._tippy) {
          elements.push(this);
        }
      })

      if (elements.length > 0) {
        $(`#${toggler}`).removeClass('fa-toggle-off').addClass('fa-toggle-on')
        // Create tooltips
        for (let e of elements) {
          tippy(e, {
            arrow: true,
            arrowType: 'round',
            size: 'large',
            duration: [250, 1000],
            animation: 'perspective'
          });
        }
      } else {
        $(`#${toggler}`).removeClass('fa-toggle-on').addClass('fa-toggle-off')
        // Destroy all tooltips
        $('[data-tippy-content]').each(function() {
          this._tippy.destroy();
        })
      }
  }
}
