import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlaceDetailsComponent } from './place-details.component';

describe('PlaceDetailsComponent', () => {
  let component: PlaceDetailsComponent;
  let fixture: ComponentFixture<PlaceDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlaceDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlaceDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
