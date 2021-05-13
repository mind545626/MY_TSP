import { TestBed, async, inject } from '@angular/core/testing';

import { WasteMoveGuard } from './waste-move.guard';

describe('WasteMoveGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [WasteMoveGuard]
    });
  });

  it('should ...', inject([WasteMoveGuard], (guard: WasteMoveGuard) => {
    expect(guard).toBeTruthy();
  }));
});
