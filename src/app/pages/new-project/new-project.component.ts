import { Component, OnInit } from '@angular/core';

import { ProjectService } from '../../shared/services/project.service';
import { CurrencyPipe, NgFor } from '@angular/common';
import {
  FormArray,
  FormBuilder,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { UserService } from '../../shared/services/user.service';
import { User } from '../../shared/interfaces/user.interface';
import { UserRole } from '../../shared/enums/user-role';
import { Router, RouterLink } from '@angular/router';
import { CurrencyInputDirective } from '../../shared/directives/currency-input.directive';

@Component({
  selector: 'app-new-project',
  standalone: true,
  imports: [NgFor, ReactiveFormsModule, RouterLink, CurrencyInputDirective],
  providers: [CurrencyPipe],
  templateUrl: './new-project.component.html',
  styles: ``,
})
export class NewProjectComponent implements OnInit {
  constructor(
    private projectService: ProjectService,
    private formBuilder: FormBuilder,
    private userService: UserService,
    private router: Router
  ) {}

  public defaultImage = 'https://via.placeholder.com/350';

  public constructorClients: User[] = [];

  public providerForm = this.formBuilder.group({
    name: ['', Validators.required],
    price: ['', Validators.required],
    startDate: ['', Validators.required],
    endDate: ['', Validators.required],
    constructorClient: ['', Validators.required],
    description: [''],
    images: this.formBuilder.array([]),
  });

  ngOnInit(): void {
    this.userService
      .getAllUsers({ role: UserRole.Constructor })
      .subscribe((users) => {
        this.constructorClients = users as User[];
      });
  }

  onFilesSelected(event: Event): void {
    const element = event.currentTarget as HTMLInputElement;
    let files: FileList | null = element.files;

    if (files) {
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        this.images.push(this.formBuilder.control(file));
      }
    }
  }

  saveProject() {
    const formData = new FormData();
    const project = this.providerForm.getRawValue() as any;

    Object.keys(project).forEach((key) => {
      if (key === 'price') {
        formData.append(key, project[key]!.replace(/[^0-9.]+/g, ''));
      } else if (key === 'startDate' || key === 'endDate') {
        formData.append(key, new Date(project[key]!).toISOString());
      } else if (key === 'images') {
        this.images.controls.forEach((image) => {
          formData.append('images', image.value);
        });
      } else {
        formData.append(key, project[key]);
      }
    });

    this.projectService.createProject(formData).subscribe(() => {
      this.router.navigate(['/dashboard/all-projects']);
    });
  }

  get images(): FormArray {
    return this.providerForm.get('images') as FormArray;
  }
}
