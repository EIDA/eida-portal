import { Component, OnInit } from '@angular/core';
import { ConsoleService } from '../console.service';
import { RequestService } from '../request.service';
import { TextService } from '../text.service';
import { Enums } from '../modules/enums';
import { ProgressBar } from '../modules/models';

declare var $: any;
@Component({
  selector: 'app-request',
  templateUrl: './request.component.html',
})
export class RequestComponent implements OnInit {

  constructor(
    public requestService: RequestService,
    public textService: TextService,
    private _consoleService: ConsoleService) { }

  ngOnInit() {
    this.requestService.progressReporter.subscribe(
      n => this._handleProgressBar(n)
    );
  }

  timeWindowSelectionModeChanges(t: Enums.RequestTimeWindowSelectionModes) {
    this.requestService.requestModel.timeWindowSelectionMode = t;
  }

  review() {
    this._consoleService.add('Request/review clicked');
  }

  download() {
    this.requestService.download();
  }

  toggleModal() {
    $('#stageModal').toggleClass('is-active');
  }

  handleModeChange(btn: string, target: string): void {
    $('#absoluteModeContent, #relativeModeContent').hide();
    $('#modesTabs').find('li').removeClass('is-active');
    $(`#${btn}`).addClass('is-active');
    $(`#${target}`).show('fast');
  }

  _handleProgressBar(n: ProgressBar): void {
    this._consoleService.add(n.message);

    if (n.completed) {
      $('#request-button-download').removeClass('is-loading');
      $('#request-download-progress').attr('value', 0);
      $('#request-download-progress').attr('max', 100);
    } else {
      $('#request-button-download').addClass('is-loading');
      if (n.indeterminate) {
        $('#request-download-progress').removeAttr('value');
      } else {
        $('#request-download-progress').attr('value', n.dividend);
        $('#request-download-progress').attr('max', n.divisor);
      }
    }
  }
}
