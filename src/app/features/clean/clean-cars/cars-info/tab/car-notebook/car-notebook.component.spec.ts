import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CarNotebookComponent } from './car-notebook.component';

describe('CarNotebookComponent', () => {
  let component: CarNotebookComponent;
  let fixture: ComponentFixture<CarNotebookComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CarNotebookComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CarNotebookComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
