import { TestBed, async, inject } from '@angular/core/testing';

import { SellerGuard } from './Seller.guard';

describe('SellerGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SellerGuard]
    });
  });

  it('should ...', inject([SellerGuard], (guard: SellerGuard) => {
    expect(guard).toBeTruthy();
  }));
});
