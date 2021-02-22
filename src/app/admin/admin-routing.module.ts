import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AdminDashboardComponent } from './components/admin-dashboard/admin-dashboard.component';
import { AdminHomeComponent } from './components/admin-home/admin-home.component';
import { AdminUserListComponent } from './components/admin-user-list/admin-user-list.component';
import { ConfigListComponent } from './components/config-list/config-list.component';
import { AdminPriceListComponent } from './components/admin-price-list/admin-price-list.component';

const routes: Routes = [
  {
    path: '', component: AdminHomeComponent, children: [
      { path: 'dashboard', component: AdminDashboardComponent, canActivate: [] },
      { path: 'config', component: ConfigListComponent, canActivate: [] },
      { path: 'users', component: AdminUserListComponent, canActivate: [] },
      { path: 'price-list', component: AdminPriceListComponent, canActivate: [] },
    ]
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
