import { TestBed, inject } from '@angular/core/testing';

import { MigrateService } from './migrate.service';

describe('MigrateService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MigrateService]
    });
  });

  it('should be created', inject([MigrateService], (service: MigrateService) => {
    expect(service).toBeTruthy();
  }));
});
