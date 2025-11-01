import { Routes } from '@angular/router';
import { AuthGuard } from './auth/auth-guard';
import { Dashboard } from './dashboard/dashboard';
import { Register } from './auth/register/register';

import { Login } from './auth/login/login';
import { Home } from './home/home';

import { AddProduct } from './dashboard/add-product/add-product';
import { Allproduct } from './dashboard/allproduct/allproduct';

export const routes: Routes = [
  { path: '', component: Home,children:[
    {
    path: 'dashboard',
    component: Dashboard,
    canActivate: [AuthGuard],
    children: [
      { path: 'allProducts', component: Allproduct },
      { path: 'addProduct', component: AddProduct },
    ],
  },
  ] },
  { path: 'login', component: Login },
  { path: 'register', component: Register },
  
];
