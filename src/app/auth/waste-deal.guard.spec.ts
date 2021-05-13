import { TestBed, async, inject } from '@angular/core/testing';

import { WasteDealGuard } from './waste-deal.guard';

describe('WasteDealGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [WasteDealGuard]
    });
  });

  it('should ...', inject([WasteDealGuard], (guard: WasteDealGuard) => {
    expect(guard).toBeTruthy();
  }));
});
