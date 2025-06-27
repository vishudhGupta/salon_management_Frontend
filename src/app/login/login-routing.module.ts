import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { UserComponent } from './login/user/user.component';
import { SuperuserComponent } from './login/superuser/superuser.component';
import { authGuard } from '../auth.guard';
import { CalendarComponent } from './login/superuser/calendar/calendar.component';
import { DashboardComponent } from './login/superuser/dashboard/dashboard.component';
import { ExpertsComponent } from './login/superuser/experts/experts.component';
import { ServicesComponent } from './login/superuser/services/services.component';

const routes: Routes = [
  {
    path: '',
    component: LoginComponent,
  },
  {
    path: 'user',
    component: UserComponent,
    canActivate: [authGuard]
  },
  {
    path: 'superuser',
    component: SuperuserComponent,
    canActivate: [authGuard],
    children: [
      {path: 'calendar', component: CalendarComponent},
      {path: 'dashboard', component: DashboardComponent},
      {path: 'experts', component: ExpertsComponent},
      {path: 'services', component: ServicesComponent},
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LoginRoutingModule {}
