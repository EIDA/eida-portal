import { Component, OnInit } from '@angular/core';
import { ConsoleService } from '../console.service';
import { RequestService } from '../request.service';
import { TextService } from '../text.service';
import { Enums } from '../modules/enums';

declare var $: any;
@Component({
  selector: 'app-request',
  templateUrl: './request.component.html',
})
export class RequestComponent implements OnInit {

  constructor(
    private _requestService: RequestService,
    public consoleService: ConsoleService,
    public textService: TextService) { }

  ngOnInit() { }

  timeWindowSelectionModeChanges(t: Enums.RequestTimeWindowSelectionModes) {
    this._requestService.requestModel.timeWindowSelectionMode = t;
  }

  review() {
    this.consoleService.add('Request/review clicked');
  }

  download() {
    this.consoleService.add('Request/submit clicked >>> ' + this._requestService.requestModel.toString());
  }

  toggleModal() {
    $('#stageModal').toggleClass('is-active');
  }

  handleModeChange(btn: string, target: string): void {
    $('#absoluteModeContent, #relativeModeContent').hide();
    $('#modesTabs').find('li').removeClass('is-active');
    $(`#${btn}`).addClass('is-active');
    $(`#${target}`).show("fast");
  }
}
