import { TestBed } from '@angular/core/testing';

import { DynamiConfigService } from './dynami-config.service';

describe('DynamiConfigService', () => {
  let service: DynamiConfigService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DynamiConfigService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
