import { Injectable } from '@angular/core';
import { MapService } from '../app/map.service';
import { map } from 'rxjs/operators';

declare var $: any;
declare var tippy: any;

@Injectable({
  providedIn: 'root'
})
export class UiService {

  constructor(
    private _mapService: MapService
  ) { }

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
    $(`#${target}`).toggle(speed, function() {
      this.triggerMapResize(true);
    }.bind(this._mapService));
  }

  resetMapZoom(value: boolean): void {
    this._mapService.triggerZoomReset(value);
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
            followCursor: 'horizontal',
            size: 'large',
            duration: [250, 250],
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
