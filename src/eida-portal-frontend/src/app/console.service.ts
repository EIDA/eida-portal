import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root"
})
export class ConsoleService {
  messages: string[] = [];

  constructor() {}

  add(message: string) {
    const _date = new Date().toLocaleString();
    this.messages.push(_date + " - " + message);
    console.log(_date + " - " + message);
  }

  clear() {
    this.messages = [];
  }

  getMsgCount() {
    return this.messages.length;
  }
}
