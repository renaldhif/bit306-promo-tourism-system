import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AttractionEntertainmentComponent } from './attraction-entertainment.component';

describe('AttractionEntertainmentComponent', () => {
  let component: AttractionEntertainmentComponent;
  let fixture: ComponentFixture<AttractionEntertainmentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AttractionEntertainmentComponent]
    });
    fixture = TestBed.createComponent(AttractionEntertainmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
