import { Component, OnInit, Input } from '@angular/core';
import { ConsoleService } from '../console.service';
import { RequestService } from '../request.service';
import { RequestModel } from '../modules/models';
import { TextService } from '../text.service';
import { Enums } from '../modules/enums';

declare var $: any;
@Component({
  selector: 'app-request',
  templateUrl: './request.component.html',
})
export class RequestComponent implements OnInit {
  @Input() requestModel = new RequestModel();

  constructor(
    private _requestService: RequestService,
    public consoleService: ConsoleService,
    public textService: TextService) { }

  ngOnInit() { }

  timeWindowSelectionModeChanges(t: Enums.RequestTimeWindowSelectionMode) {
    this.requestModel.timeWindowSelectionMode = t;
  }

  review() {
    this.consoleService.add('Request/review clicked');
  }

  download() {
    this.consoleService.add('Request/submit clicked >>> ' + this.requestModel.toString());
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
