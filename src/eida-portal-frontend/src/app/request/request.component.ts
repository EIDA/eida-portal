import { Component, OnInit, Input } from '@angular/core';
import { ConsoleService } from '../console.service';
import { RequestModel } from '../models'

declare var $: any;
@Component({
  selector: 'app-request',
  templateUrl: './request.component.html',
})
export class RequestComponent implements OnInit {
  @Input() requestModel = new RequestModel();

  constructor(public consoleService: ConsoleService) { }

  ngOnInit() {
    this.consoleService.add('Request initiated');
  }

  review() {
    this.consoleService.add('Request/review clicked');
  }

  submit() {
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
