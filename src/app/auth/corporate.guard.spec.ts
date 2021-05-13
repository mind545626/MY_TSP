import { TestBed, async, inject } from '@angular/core/testing';

import { CorporateGuard } from './corporate.guard';

describe('CorporateGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CorporateGuard]
    });
  });

  it('should ...', inject([CorporateGuard], (guard: CorporateGuard) => {
    expect(guard).toBeTruthy();
  }));
});
