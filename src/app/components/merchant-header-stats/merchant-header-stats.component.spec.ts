import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MerchantHeaderStatsComponent } from './merchant-header-stats.component';

describe('MerchantHeaderStatsComponent', () => {
  let component: MerchantHeaderStatsComponent;
  let fixture: ComponentFixture<MerchantHeaderStatsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MerchantHeaderStatsComponent]
    });
    fixture = TestBed.createComponent(MerchantHeaderStatsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
