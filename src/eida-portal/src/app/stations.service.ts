import { Injectable } from '@angular/core';
import { catchError, map, tap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { EidaService } from './eida.service';
import { FdsnNetwork, FdsnStation } from './models'

@Injectable({
  providedIn: 'root'
})
export class StationsService {

  constructor(
    private eidaService: EidaService
  ) { }

  private networksUrl = 'http://127.0.0.1:49160/n';

  getNetworks(): Observable<FdsnNetwork[]> {
    return this.eidaService.http.get<FdsnNetwork[]>(this.networksUrl)
      .pipe(
        tap(_ => this.eidaService.log('fetched data')),
        catchError(this.eidaService.handleError('getNetworks', []))
      );
  }

}