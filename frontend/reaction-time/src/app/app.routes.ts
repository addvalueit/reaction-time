import {Routes} from '@angular/router';
import {LoginComponent} from './loginComponent/login.component';
import {TimeTableComponent} from './timeTableComponent/timeTableComponent.component';

export const routes: Routes = [
  {path: '', redirectTo: 'login', pathMatch: 'full'},
  {path: 'login', title: 'LOGIN', component: LoginComponent},
  {path: 'time-table/:id', title: 'TIME TABLE', component: TimeTableComponent},
  {path: '**', redirectTo: 'login', pathMatch: 'full'},
];
