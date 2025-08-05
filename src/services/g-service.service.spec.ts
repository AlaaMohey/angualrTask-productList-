import { TestBed } from '@angular/core/testing';

import { GServiceService } from './g-service.service';

describe('GServiceService', () => {
  let service: GServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
