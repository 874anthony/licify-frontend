import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';

import { ProjectService } from '../../shared/services/project.service';
import { Project } from '../../shared/interfaces/project.interface';
import { CurrencyPipe, NgClass, NgFor, NgIf } from '@angular/common';

import { UserService } from '../../shared/services/user.service';
import { User } from '../../shared/interfaces/user.interface';
import {
  FormArray,
  FormBuilder,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

import { CurrencyInputDirective } from '../../shared/directives/currency-input.directive';
import { UserRole } from '../../shared/enums/user-role';

@Component({
  selector: 'app-project',
  standalone: true,
  imports: [
    RouterLink,
    NgFor,
    NgIf,
    NgClass,
    ReactiveFormsModule,
    CurrencyInputDirective,
  ],
  providers: [CurrencyPipe],
  templateUrl: './project.component.html',
  styles: ``,
})
export class ProjectComponent implements OnInit {
  constructor(
    private activatedRoute: ActivatedRoute,
    private projectService: ProjectService,
    private currencyPipe: CurrencyPipe,
    private formBuilder: FormBuilder,
    private userService: UserService
  ) {}

  public project: Project = {} as Project;
  public defaultImage = 'https://via.placeholder.com/350';

  public providers: User[] = [];
  public constructorClients: User[] = [];

  public isProvider: boolean =
    localStorage.getItem('role') === UserRole.Provider;

  public providerForm = this.formBuilder.group({
    name: ['', Validators.required],
    price: ['', Validators.required],
    startDate: ['', Validators.required],
    endDate: ['', Validators.required],
    constructorClient: ['', Validators.required],
    provider: [''],
    description: [''],
    items: this.formBuilder.array([]),
    images: this.formBuilder.array([]),
  });

  ngOnInit(): void {
    this.loadProjectForm();
  }

  loadProjectForm() {
    this.activatedRoute.params.subscribe(({ id }) => {
      this.projectService.getProjectById(id).subscribe((project: any) => {
        this.project = project;
        this.updateFormValues(project);
      });
    });

    this.userService.getAllUsers().subscribe((users: any) => {
      this.constructorClients = users.filter(
        (user: User) => user.role === UserRole.Constructor
      );
      this.providers = users.filter(
        (user: User) => user.role === UserRole.Provider
      );
    });
  }

  private updateFormValues(project: Project) {
    this.providerForm.patchValue({
      ...project,
      startDate: new Date(project.startDate).toISOString().split('T')[0],
      endDate: new Date(project.endDate).toISOString().split('T')[0],
      price: this.currencyPipe.transform(
        project.price,
        'USD',
        'symbol',
        '1.0-0'
      )!,
      constructorClient: project.constructorClient?._id,
      provider: project.provider?._id,
    });

    const itemsArray = this.providerForm.get('items') as FormArray;
    itemsArray.clear();

    project.items?.forEach((item: string) => {
      itemsArray.push(this.formBuilder.control(item));
    });

    const imagesArray = this.providerForm.get('images') as FormArray;
    // imagesArray.clear();

    project.images?.forEach((image: string) => {
      imagesArray.push(this.formBuilder.control(image));
    });
  }

  deleteItem(item: number) {
    this.items.removeAt(item);
  }

  addItem(item: string) {
    this.items.push(this.formBuilder.control(item));
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
      } else if (key === 'images' || key === 'items') {
        // do nothing
        return;
      } else {
        formData.append(key, project[key]);
      }
    });

    if (this.items.controls.length > 0) {
      this.items.controls.forEach((item) => {
        formData.append('items', item.value);
      });
    }

    if (this.images.controls.length > 0) {
      this.images.controls.forEach((image) => {
        formData.append('images', image.value);
      });
    }

    this.projectService
      .updateProject(this.project._id, formData)
      .subscribe(() => {
        this.loadProjectForm();
      });
  }

  get hasImages() {
    return this.project.images && this.project.images.length > 0;
  }

  get items(): FormArray {
    return this.providerForm.get('items') as FormArray;
  }

  get images(): FormArray {
    return this.providerForm.get('images') as FormArray;
  }
}
