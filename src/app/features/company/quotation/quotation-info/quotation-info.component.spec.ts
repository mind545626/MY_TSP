import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuotationInfoComponent } from './quotation-info.component';

describe('QuotationInfoComponent', () => {
  let component: QuotationInfoComponent;
  let fixture: ComponentFixture<QuotationInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuotationInfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuotationInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
