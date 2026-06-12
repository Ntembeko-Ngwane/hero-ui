import { Routes } from '@angular/router';
import { HeroListComponent } from '../heroes/pages/hero-list/hero-list.component';
import { AddHeroComponent } from '../heroes/pages/add-hero/add-hero.component';
import { EditHeroComponent } from '../heroes/pages/edit-hero/edit-hero.component';
import { LoginComponent } from '../heroes/pages/login/login.component';
import { RegisterComponent } from '../heroes/pages/register/register.component';

export const HEROES_ROUTES: Routes = [
  { path: '', component: HeroListComponent },
  { path: 'add', component: AddHeroComponent },
  { path: 'edit/:id', component: EditHeroComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },

  { path: '', redirectTo: 'heroes', pathMatch: 'full' }
];
