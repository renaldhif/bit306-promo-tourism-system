import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewMerchantDetailComponent } from './view-merchant-detail.component';

describe('ViewMerchantDetailComponent', () => {
  let component: ViewMerchantDetailComponent;
  let fixture: ComponentFixture<ViewMerchantDetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ViewMerchantDetailComponent]
    });
    fixture = TestBed.createComponent(ViewMerchantDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
