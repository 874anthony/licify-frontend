import { Routes } from '@angular/router';
import { PagesComponent } from './pages/pages.component';
import { AllProjectsComponent } from './pages/all-projects/all-projects.component';
import { ProjectComponent } from './pages/project/project.component';
import { LoginComponent } from './auth/login/login.component';
import { SignupComponent } from './auth/signup/signup.component';

export const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'signup',
    component: SignupComponent,
  },
  {
    path: 'dashboard',
    component: PagesComponent,
    children: [
      { path: 'all-projects', component: AllProjectsComponent },
      { path: 'project/:id', component: ProjectComponent },
      { path: '**', pathMatch: 'full', redirectTo: 'all-projects' },
    ],
  },
  { path: '**', pathMatch: 'full', redirectTo: 'dashboard' },
];
