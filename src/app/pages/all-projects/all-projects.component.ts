import { Component, OnInit } from '@angular/core';
import { NgFor } from '@angular/common';

import { ProjectCardComponent } from '../../components/project-card/project-card.component';

import { ProjectService } from '../../shared/services/project.service';
import { Project } from '../../shared/interfaces/project.interface';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-all-projects',
  standalone: true,
  imports: [ProjectCardComponent, NgFor, RouterLink],
  templateUrl: './all-projects.component.html',
  styles: ``,
})
export class AllProjectsComponent implements OnInit {
  public projects: Project[] = [];

  constructor(private projectService: ProjectService, private router: Router) {}

  ngOnInit(): void {
    this.projectService
      .getAllProjects()
      .subscribe((projects: any) => (this.projects = projects));
  }

  openProject(project: Project): void {
    this.router.navigate([`/dashboard/project/${project._id}`]);
  }
}
