import { TestBed, async, inject } from '@angular/core/testing';

import { CourierGuard } from './courier.guard';

describe('CourierGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CourierGuard]
    });
  });

  it('should ...', inject([CourierGuard], (guard: CourierGuard) => {
    expect(guard).toBeTruthy();
  }));
});
