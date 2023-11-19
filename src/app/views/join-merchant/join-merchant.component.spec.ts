import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JoinMerchantComponent } from './join-merchant.component';

describe('JoinMerchantComponent', () => {
  let component: JoinMerchantComponent;
  let fixture: ComponentFixture<JoinMerchantComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [JoinMerchantComponent]
    });
    fixture = TestBed.createComponent(JoinMerchantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
