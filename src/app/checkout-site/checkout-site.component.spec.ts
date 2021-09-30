import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckoutSiteComponent } from './checkout-site.component';

describe('CheckoutSiteComponent', () => {
  let component: CheckoutSiteComponent;
  let fixture: ComponentFixture<CheckoutSiteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CheckoutSiteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CheckoutSiteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
