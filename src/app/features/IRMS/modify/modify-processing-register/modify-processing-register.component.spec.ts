import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModifyProcessingRegisterComponent } from './modify-processing-register.component';

describe('ModifyProcessingRegisterComponent', () => {
  let component: ModifyProcessingRegisterComponent;
  let fixture: ComponentFixture<ModifyProcessingRegisterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModifyProcessingRegisterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModifyProcessingRegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
