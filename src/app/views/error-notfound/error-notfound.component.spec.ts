import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ErrorNotfoundComponent } from './error-notfound.component';

describe('ErrorNotfoundComponent', () => {
  let component: ErrorNotfoundComponent;
  let fixture: ComponentFixture<ErrorNotfoundComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ErrorNotfoundComponent]
    });
    fixture = TestBed.createComponent(ErrorNotfoundComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
