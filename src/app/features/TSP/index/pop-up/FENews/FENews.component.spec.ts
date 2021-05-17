import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FENewsComponent } from './FENews.component';

describe('FENewsComponent', () => {
  let component: FENewsComponent;
  let fixture: ComponentFixture<FENewsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FENewsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FENewsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
