import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminProductUnitComponent } from './admin-product-unit.component';

describe('AdminProductUnitComponent', () => {
  let component: AdminProductUnitComponent;
  let fixture: ComponentFixture<AdminProductUnitComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminProductUnitComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminProductUnitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
