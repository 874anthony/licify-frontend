import { Routes } from '@angular/router';

import { inject } from '@angular/core';
import { AuthService } from './auth/auth.service';

import { PagesComponent } from './pages/pages.component';
import { AllProjectsComponent } from './pages/all-projects/all-projects.component';
import { ProjectComponent } from './pages/project/project.component';
import { LoginComponent } from './auth/login/login.component';
import { SignupComponent } from './auth/signup/signup.component';
import { NewProjectComponent } from './pages/new-project/new-project.component';
import { ProfileComponent } from './pages/profile/profile.component';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  {
    path: 'dashboard',
    component: PagesComponent,
    canActivate: [() => inject(AuthService).isLoggedIn()],
    children: [
      { path: 'all-projects', component: AllProjectsComponent },
      { path: 'new-project', component: NewProjectComponent },
      { path: 'project/:id', component: ProjectComponent },
      { path: 'profile', component: ProfileComponent },
      { path: '**', pathMatch: 'full', redirectTo: 'all-projects' },
    ],
  },
  { path: '**', pathMatch: 'full', redirectTo: 'login' },
];
