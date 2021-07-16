import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AdminDashboardComponent } from './components/admin-dashboard/admin-dashboard.component';
import { AdminHomeComponent } from './components/admin-home/admin-home.component';
import { AdminUserListComponent } from './components/admin-user-list/admin-user-list.component';
import { ConfigListComponent } from './components/config-list/config-list.component';
import { AdminPriceListComponent } from './components/admin-price-list/admin-price-list.component';
import { AdminProductUnitListComponent } from './components/admin-product-unit-list/admin-product-unit-list.component';
import { AdminGuard } from '../shared/guard/admin.guard';

const routes: Routes = [
  {
    path: '', component: AdminHomeComponent, children: [
      { path: 'dashboard', component: AdminDashboardComponent, canActivate: [AdminGuard] },
      { path: 'config', component: ConfigListComponent, canActivate: [AdminGuard] },
      { path: 'users', component: AdminUserListComponent, canActivate: [AdminGuard] },
      { path: 'price-list', component: AdminPriceListComponent, canActivate: [AdminGuard] },
      { path: 'product-units', component: AdminProductUnitListComponent, canActivate: [AdminGuard] },
    ]
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
