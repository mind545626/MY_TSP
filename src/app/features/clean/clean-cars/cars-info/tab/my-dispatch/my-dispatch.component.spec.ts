import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyDispatchComponent } from './my-dispatch.component';

describe('MyDispatchComponent', () => {
  let component: MyDispatchComponent;
  let fixture: ComponentFixture<MyDispatchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyDispatchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyDispatchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
