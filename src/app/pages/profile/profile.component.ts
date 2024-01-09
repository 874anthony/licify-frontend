import { Component } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { UserService } from '../../shared/services/user.service';
import { User } from '../../shared/interfaces/user.interface';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './profile.component.html',
  styles: ``,
})
export class ProfileComponent {
  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService
  ) {}

  public defaultImage = 'https://via.placeholder.com/150';

  public user: User = {} as User;

  public userForm = this.formBuilder.group({
    name: [''],
    businessName: [''],
    email: [''],
    avatar: [''],
  });

  ngOnInit(): void {
    this.userService.getCurrentUser().subscribe((user: any) => {
      this.user = user;
      this.userForm.patchValue(user);
    });
  }

  onSelectedFile(event: any): void {
    const reader = new FileReader();

    if (event.target.files && event.target.files.length) {
      const [file] = event.target.files;
      this.userForm.get('avatar')?.setValue(file);
    }
  }

  saveUser(): void {
    const formData = new FormData();
    const userFormValues = this.userForm.getRawValue() as any;

    Object.keys(userFormValues).forEach((key) => {
      const value = userFormValues[key];

      if (key === 'avatar') {
        formData.append('avatar', value, value.name);
      } else {
        formData.append(key, value);
      }
    });

    this.userService.updateUser(this.user._id!, formData).subscribe((user) => {
      this.user = user;
      this.userForm.patchValue(user);
    });
  }
}
