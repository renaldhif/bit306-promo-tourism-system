import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MerchantDashboardComponent } from './merchant-dashboard.component';

describe('MerchantDashboardComponent', () => {
  let component: MerchantDashboardComponent;
  let fixture: ComponentFixture<MerchantDashboardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MerchantDashboardComponent]
    });
    fixture = TestBed.createComponent(MerchantDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
