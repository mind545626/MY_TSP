import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CleanDispatchComponent } from './clean-dispatch.component';

describe('CleanDispatchComponent', () => {
  let component: CleanDispatchComponent;
  let fixture: ComponentFixture<CleanDispatchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CleanDispatchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CleanDispatchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
