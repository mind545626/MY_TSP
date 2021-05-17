import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProcessingRegisterComponent } from './processing-register.component';

describe('ProcessingRegisterComponent', () => {
  let component: ProcessingRegisterComponent;
  let fixture: ComponentFixture<ProcessingRegisterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProcessingRegisterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProcessingRegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
