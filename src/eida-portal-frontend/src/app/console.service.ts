import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ConsoleService {
  messages: string[] = [];

  constructor() { }

  add(message: string) {
    this.messages.push(new Date().toLocaleString() + ' - ' + message);
  }

  clear() {
    this.messages = [];
  }

  getMsgCount() {
    return this.messages.length;
  }
}
