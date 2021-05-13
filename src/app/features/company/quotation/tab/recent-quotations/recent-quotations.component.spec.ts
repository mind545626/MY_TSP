import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RecentQuotationsComponent } from './recent-quotations.component';

describe('RecentQuotationsComponent', () => {
  let component: RecentQuotationsComponent;
  let fixture: ComponentFixture<RecentQuotationsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RecentQuotationsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RecentQuotationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
