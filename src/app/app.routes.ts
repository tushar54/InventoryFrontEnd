import { Routes } from '@angular/router';
import { AuthGuard } from './auth/auth-guard';
import { Dashboard } from './dashboard/dashboard';
import { Register } from './auth/register/register';


import { Login } from './auth/login/login';
import { Home } from './home/home';

export const routes: Routes = [
  { path: '', component: Home },
  { path: 'login', component: Login },
  { path: 'register', component: Register },
  { path: 'dashboard', component: Dashboard, },
];
