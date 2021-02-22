import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminPriceListComponent } from './admin-price-list.component';

describe('AdminPriceListComponent', () => {
  let component: AdminPriceListComponent;
  let fixture: ComponentFixture<AdminPriceListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminPriceListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminPriceListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
