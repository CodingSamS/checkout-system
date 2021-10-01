import { TestBed } from '@angular/core/testing';

import { DatabaseAccessService } from './database-access.service';

describe('DatabaseAccessService', () => {
  let service: DatabaseAccessService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DatabaseAccessService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
