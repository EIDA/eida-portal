import { TestBed, inject } from '@angular/core/testing';

import { EidaService } from './eida.service';

describe('EidaService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [EidaService]
    });
  });

  it('should be created', inject([EidaService], (service: EidaService) => {
    expect(service).toBeTruthy();
  }));
});
