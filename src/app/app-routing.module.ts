import { FourZeroFourComponent } from './shared/component/four-zero-four/four-zero-four.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthGuard } from './shared/guard/auth.guard';
import { HomeGuard } from './shared/guard/home.guard';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', loadChildren: () => import('src/app/home/home.module').then(m => m.HomeModule), canLoad: [HomeGuard] },
  { path: 'auth', loadChildren: () => import('src/app/auth/auth.module').then(m => m.AuthModule), canLoad: [AuthGuard] },
  { path: '**', component: FourZeroFourComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
