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
import { CalendarComponent } from './login/superuser/calendar/calendar.component';
import { DashboardComponent } from './login/superuser/dashboard/dashboard.component';
import { ExpertsComponent } from './login/superuser/experts/experts.component';
import { ServicesComponent } from './login/superuser/services/services.component';
import { StatisticsComponent } from './login/superuser/statistics/statistics.component';


@NgModule({
  declarations: [LoginComponent, UserComponent, SuperuserComponent, CalendarComponent, DashboardComponent, ExpertsComponent, ServicesComponent, StatisticsComponent],
  imports: [CommonModule, LoginRoutingModule, ReactiveFormsModule, FormsModule, NgChartsModule,HttpClientModule,CoreModule],
})
export class LoginModule {}
