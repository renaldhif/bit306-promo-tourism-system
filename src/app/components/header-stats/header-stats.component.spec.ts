import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderStatsComponent } from './header-stats.component';

describe('HeaderStatsComponent', () => {
  let component: HeaderStatsComponent;
  let fixture: ComponentFixture<HeaderStatsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HeaderStatsComponent]
    });
    fixture = TestBed.createComponent(HeaderStatsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
