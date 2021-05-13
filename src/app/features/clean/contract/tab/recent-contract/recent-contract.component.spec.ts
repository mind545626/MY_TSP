import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RecentContractComponent } from './recent-contract.component';

describe('RecentContractComponent', () => {
  let component: RecentContractComponent;
  let fixture: ComponentFixture<RecentContractComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RecentContractComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RecentContractComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
