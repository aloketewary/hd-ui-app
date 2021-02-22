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


@NgModule({
  declarations: [ConfigComponent, AdminDashboardComponent, AdminHomeComponent, ConfigListComponent, AdminUserListComponent, AdminPriceListComponent],
  imports: [
    CommonModule,
    SharedModule,
    AdminRoutingModule,

  ],
  entryComponents: [ConfigComponent]
})
export class AdminModule { }
