import { Component, Input } from '@angular/core';
import { Project } from '../../shared/interfaces/project.interface';
import { CurrencyPipe, DatePipe, NgIf } from '@angular/common';

import { UserRole } from '../../shared/enums/user-role';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-project-card',
  standalone: true,
  imports: [CurrencyPipe, DatePipe, NgIf, RouterLink],
  templateUrl: './project-card.component.html',
  styles: ``,
})
export class ProjectCardComponent {
  @Input() public project: Project = {} as Project;
  public isProvider = localStorage.getItem('role') === UserRole.Provider;
  public defaultImage = 'https://via.placeholder.com/150';
}
