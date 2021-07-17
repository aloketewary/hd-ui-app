import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminGuard } from '../shared/guard/admin.guard';
import { HomeGuard } from '../shared/guard/home.guard';
import { HomeDashboardComponent } from './components/home-dashboard/home-dashboard.component';
import { HomeComponent } from './components/home/home.component';

const routes: Routes = [
  {
    path: '', component: HomeComponent, children: [
      { path: 'dashboard', component: HomeDashboardComponent, canActivate: [HomeGuard] },
      { path: 'admin', loadChildren: () => import('src/app/admin/admin.module').then(m => m.AdminModule), canLoad: [AdminGuard] },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
