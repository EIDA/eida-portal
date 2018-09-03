import { TestBed, inject } from '@angular/core/testing';

import { StationsService } from './stations.service';

describe('StationsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [StationsService]
    });
  });

  it('should be created', inject([StationsService], (service: StationsService) => {
    expect(service).toBeTruthy();
  }));
});
