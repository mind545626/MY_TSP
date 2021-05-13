import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpiredContractComponent } from './expired-contract.component';

describe('ExpiredContractComponent', () => {
  let component: ExpiredContractComponent;
  let fixture: ComponentFixture<ExpiredContractComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExpiredContractComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExpiredContractComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
