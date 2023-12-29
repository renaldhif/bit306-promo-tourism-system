import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PackageTourComponent } from './package-tour.component';

describe('PackageTourComponent', () => {
  let component: PackageTourComponent;
  let fixture: ComponentFixture<PackageTourComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PackageTourComponent]
    });
    fixture = TestBed.createComponent(PackageTourComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
