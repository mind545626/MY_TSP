import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CleanCarsComponent } from './clean-cars.component';

describe('CleanCarsComponent', () => {
  let component: CleanCarsComponent;
  let fixture: ComponentFixture<CleanCarsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CleanCarsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CleanCarsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
