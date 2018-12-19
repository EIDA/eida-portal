import { Injectable } from '@angular/core';
import { ConsoleService } from '../app/console.service'
import TextsJson from '../assets/texts.json';

@Injectable({
  providedIn: 'root'
})
export class TextService {

  private _vocabulary = new Array();

  constructor() {
    for (let n in TextsJson) {
      this._vocabulary[TextsJson[n]['key']] = TextsJson[n]['values']['en']
    }
  }

  getText(key: string=null): string {
    if (!key) {
      return 'Key not defined!';
    } else if (!(key in this._vocabulary) || this._vocabulary[key].length <= 0) {
      return `No text found for key <b style="color:red">${key}<b>`;
    } else {
      return this._vocabulary[key]
    }
  }
}
