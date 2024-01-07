import { Routes } from '@angular/router';
import { PagesComponent } from './pages/pages.component';
import { AllProjectsComponent } from './pages/all-projects/all-projects.component';
import { ProjectComponent } from './pages/project/project.component';

export const routes: Routes = [
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
