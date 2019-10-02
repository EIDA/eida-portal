import { Injectable } from '@angular/core';
import { Observable, of, Subject, BehaviorSubject } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { DateHelper } from './helpers/date.helper';
import { Enums } from './modules/enums';
import { ConsoleService } from './console.service';
import { BaseService } from './base.service';
import { EidaToken } from './modules/models';

@Injectable({
  providedIn: 'root'
})
export class EidaService extends BaseService {
  public eidaToken = new BehaviorSubject(new EidaToken());
  public tokenTimeout = new Subject<string>();
  public tokenAuthenticated = new Subject<boolean>();
  private _eidaCredentials: string;

  constructor(
    public http: HttpClient,
    private _consoleService: ConsoleService
  ) {
    super();
  }

  public httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  public log(message: string) {
    this._consoleService.add(`EidaService: ${message}`);
  }

  public parseToken(file): void {
    if (!file) {
      this.eidaToken.next(null);
      this.tokenAuthenticated.next(false);
      return;
    }

    const et = new EidaToken();
    et.file = file;
    const fr = new FileReader();

    fr.onload = e => {
      et.text = fr.result;
      try {
        et.meta = JSON.parse(et.text.split('\n')[4]);
      } catch (error) {
        this._consoleService.addNotification(
          Enums.NotificationLevels.Error,
          `Following error occured when parsing the token: ${error.message}`
        );
        return;
      }

      this.eidaToken.next(et);
      this.tokenAuthenticated.next(true);

      const intervalId = setInterval(
        function() {
          // When the token is detached, stop the interval
          if (!this.eidaToken.value) {
            clearInterval(intervalId);
          }
          // Get today's date and time
          const dt = new DateHelper();
          const now: any = dt.now();
          const valid_until: any = dt.getDate(
            this.eidaToken.value.meta.valid_until
          );

          // Find the distance between now and the count down date
          const distance: number = valid_until - now;

          if (distance <= 0) {
            this.tokenAuthenticated.next(false);
            this.tokenTimeout.next(`EIDA Token has expired!`);
            clearInterval(intervalId);
            return;
          }

          // Time calculations for days, hours, minutes and seconds
          const days = Math.floor(distance / (1000 * 60 * 60 * 24));
          const hours = Math.floor(
            (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
          );
          const minutes = Math.floor(
            (distance % (1000 * 60 * 60)) / (1000 * 60)
          );
          const seconds = Math.floor((distance % (1000 * 60)) / 1000);

          this.tokenTimeout.next(
            `Token lifespan: ${days} days, ${hours} hours, ${minutes} minutes, ${seconds} seconds`
          );
        }.bind(this),
        1000
      );
    };
    fr.readAsText(file);
  }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  public handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}
