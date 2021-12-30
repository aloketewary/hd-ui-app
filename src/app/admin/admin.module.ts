import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { SharedModule } from '../shared/shared.module';
import { AdminRoutingModule } from './admin-routing.module';
import { AdminDashboardComponent } from './components/admin-dashboard/admin-dashboard.component';
import { AdminHomeComponent } from './components/admin-home/admin-home.component';
import { ConfigListComponent } from './components/config-list/config-list.component';
import { ConfigComponent } from './components/config/config.component';
import { AdminUserListComponent } from './components/admin-user-list/admin-user-list.component';
import { AdminPriceListComponent } from './components/admin-price-list/admin-price-list.component';
import { AdminPriceManagerComponent } from './components/admin-price-manager/admin-price-manager.component';
import { FilesUploadComponent } from './components/files-upload/files-upload.component';
import { AdminProductUnitListComponent } from './components/admin-product-unit-list/admin-product-unit-list.component';
import { AdminProductUnitComponent } from './components/admin-product-unit/admin-product-unit.component';
import { AdminUserComponent } from './components/admin-user/admin-user.component';


@NgModule({
  declarations: [
    ConfigComponent,
    AdminDashboardComponent,
    AdminHomeComponent,
    ConfigListComponent,
    AdminUserListComponent,
    AdminPriceListComponent,
    FilesUploadComponent,
    AdminPriceManagerComponent,
    AdminProductUnitListComponent,
    AdminProductUnitComponent,
    AdminUserComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    AdminRoutingModule,
  ],
  entryComponents: [ConfigComponent, AdminUserComponent]
})
export class AdminModule { }
