import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { Notification } from './modules/models';
import { DateHelper } from './helpers/date.helper';
import * as _ from '../assets/js/lodash/lodash.js';

@Injectable({
  providedIn: "root"
})
export class ConsoleService {
  public notifications = new Subject<Notification>();

  constructor() {}

  add(message: string) {
    const _date = new Date().toLocaleString();
    console.log(_date + " - " + message);
  }

  addNotification(lvl: number, msg: string) {
    // Add and broadcast new notification
    const dh = new DateHelper();
    let notification = new Notification();
    notification.timestamp = dh.getTimestamp();
    notification.level = lvl;
    notification.message = msg;
    this.notifications.next(notification);
  }
}
