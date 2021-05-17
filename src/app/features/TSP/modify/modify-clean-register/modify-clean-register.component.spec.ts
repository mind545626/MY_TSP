import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModifyCleanRegisterComponent } from './modify-clean-register.component';

describe('ModifyCleanRegisterComponent', () => {
  let component: ModifyCleanRegisterComponent;
  let fixture: ComponentFixture<ModifyCleanRegisterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModifyCleanRegisterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModifyCleanRegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
