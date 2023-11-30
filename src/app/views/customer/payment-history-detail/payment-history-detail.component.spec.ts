import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentHistoryDetailComponent } from './payment-history-detail.component';

describe('PaymentHistoryDetailComponent', () => {
  let component: PaymentHistoryDetailComponent;
  let fixture: ComponentFixture<PaymentHistoryDetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PaymentHistoryDetailComponent]
    });
    fixture = TestBed.createComponent(PaymentHistoryDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
