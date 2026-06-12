import { Routes } from '@angular/router';
import { HEROES_ROUTES } from './Features/heroes/heroes.routes';

export const routes: Routes = [
  {
    path: 'login',
    loadComponent: () => import('./Features/heroes/pages/login/login.component')
      .then(m => m.LoginComponent)
  },
  {
    path: 'register',
    loadComponent: () => import('./Features/heroes/pages/register/register.component')
      .then(m => m.RegisterComponent)
  },

  {
    path: 'heroes',
    children: HEROES_ROUTES
  },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  }
];
