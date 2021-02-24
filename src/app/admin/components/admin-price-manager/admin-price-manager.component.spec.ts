import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminPriceManagerComponent } from './admin-price-manager.component';

describe('AdminPriceManagerComponent', () => {
  let component: AdminPriceManagerComponent;
  let fixture: ComponentFixture<AdminPriceManagerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminPriceManagerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminPriceManagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
