import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoginRoutingModule } from './login-routing.module';
import { LoginComponent } from './login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UserComponent } from './login/user/user.component';
import { SuperuserComponent } from './login/superuser/superuser.component';
import { NgChartsModule } from 'ng2-charts';
import { HttpClientModule } from '@angular/common/http';
import { CoreModule } from '../core/core.module';


@NgModule({
  declarations: [LoginComponent, UserComponent, SuperuserComponent],
  imports: [CommonModule, LoginRoutingModule, ReactiveFormsModule, FormsModule, NgChartsModule,HttpClientModule,CoreModule],
})
export class LoginModule {}
