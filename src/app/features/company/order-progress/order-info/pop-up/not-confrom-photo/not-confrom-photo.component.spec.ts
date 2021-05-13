import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NotConfromPhotoComponent } from './not-confrom-photo.component';

describe('ConfromPhotoComponent', () => {
  let component: NotConfromPhotoComponent;
  let fixture: ComponentFixture<NotConfromPhotoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NotConfromPhotoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NotConfromPhotoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
