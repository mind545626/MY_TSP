import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModifyPasswordCheckComponent } from './modify-password-check.component';

describe('ModifyPasswordCheckComponent', () => {
  let component: ModifyPasswordCheckComponent;
  let fixture: ComponentFixture<ModifyPasswordCheckComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModifyPasswordCheckComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModifyPasswordCheckComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
