import { TestBed } from '@angular/core/testing';

import { FactorsService } from './factors.service';

describe('FactorsService', () => {
  let service: FactorsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FactorsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
