import { AuthGuard } from './../shared/guard/auth.guard';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from './components/login/login.component';

const routes: Routes = [
  { path: '', redirectTo: 'login' },
  { path: 'login', component: LoginComponent, canActivate: [AuthGuard] },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
