import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModifyMemberProfileComponent } from './modify-member-profile.component';

describe('ModifyMemberProfileComponent', () => {
  let component: ModifyMemberProfileComponent;
  let fixture: ComponentFixture<ModifyMemberProfileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModifyMemberProfileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModifyMemberProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
