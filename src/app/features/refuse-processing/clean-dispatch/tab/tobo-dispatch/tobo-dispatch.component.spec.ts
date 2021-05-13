import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ToboDispatchComponent } from './tobo-dispatch.component';

describe('ToboDispatchComponent', () => {
  let component: ToboDispatchComponent;
  let fixture: ComponentFixture<ToboDispatchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ToboDispatchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ToboDispatchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
