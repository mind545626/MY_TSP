import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CompletePhotoComponent } from './complete-photo.component';

describe('CompletePhotoComponent', () => {
  let component: CompletePhotoComponent;
  let fixture: ComponentFixture<CompletePhotoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CompletePhotoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CompletePhotoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
