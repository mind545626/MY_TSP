import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FEBillboardComponent } from './FEBillboard.component';

describe('FEBillboardComponent', () => {
  let component: FEBillboardComponent;
  let fixture: ComponentFixture<FEBillboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FEBillboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FEBillboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
