import { SharedModule } from 'src/app/shared/shared.module';

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { AuthRoutingModule } from './auth-routing.module';
import { LoginComponent } from './components/login/login.component';

@NgModule({
  declarations: [LoginComponent],
  imports: [
    CommonModule,
    AuthRoutingModule,
    SharedModule
  ]
})
export class AuthModule { }
