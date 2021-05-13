import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ToboMatchComponent } from './tobo-match.component';

describe('ToboMatchComponent', () => {
  let component: ToboMatchComponent;
  let fixture: ComponentFixture<ToboMatchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ToboMatchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ToboMatchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
