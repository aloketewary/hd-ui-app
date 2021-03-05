import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminProductUnitListComponent } from './admin-product-unit-list.component';

describe('AdminProductUnitListComponent', () => {
  let component: AdminProductUnitListComponent;
  let fixture: ComponentFixture<AdminProductUnitListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminProductUnitListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminProductUnitListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
