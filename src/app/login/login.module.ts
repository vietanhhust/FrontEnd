import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginRoutingRoutes } from './login.routing';

import { LoginPageComponent } from './loginpage/login.page.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    LoginRoutingRoutes,
    ReactiveFormsModule
  ],
  declarations: [LoginPageComponent]
})
export class LoginModule { }
