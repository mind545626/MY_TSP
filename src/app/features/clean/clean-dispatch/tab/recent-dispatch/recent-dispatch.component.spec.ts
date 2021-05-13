import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RecentDispatchComponent } from './recent-dispatch.component';

describe('RecentDispatchComponent', () => {
  let component: RecentDispatchComponent;
  let fixture: ComponentFixture<RecentDispatchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RecentDispatchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RecentDispatchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
