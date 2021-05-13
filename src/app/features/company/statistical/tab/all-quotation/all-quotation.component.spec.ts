import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AllQuotationComponent } from './all-quotation.component';

describe('AllQuotationComponent', () => {
  let component: AllQuotationComponent;
  let fixture: ComponentFixture<AllQuotationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AllQuotationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AllQuotationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
