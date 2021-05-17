import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CleanRegisterComponent } from './clean-register.component';

describe('CleanRegisterComponent', () => {
  let component: CleanRegisterComponent;
  let fixture: ComponentFixture<CleanRegisterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CleanRegisterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CleanRegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
