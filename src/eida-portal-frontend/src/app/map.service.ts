import { Injectable } from '@angular/core';
import { EidaService } from './eida.service';

@Injectable({
  providedIn: 'root'
})
export class MapService {
  constructor(private eidaService: EidaService) { }
}
