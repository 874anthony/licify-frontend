import { Component } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [RouterLink, ReactiveFormsModule],
  templateUrl: './signup.component.html',
  styles: ``,
})
export class SignupComponent {
  constructor(private authService: AuthService, private router: Router) {}

  public signupForm = new FormGroup(
    {
      name: new FormControl('', [Validators.required]),
      role: new FormControl('', [Validators.required]),
      businessName: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required]),
      passwordConfirm: new FormControl('', [Validators.required]),
    },
    { validators: this.passwordMatchValidator }
  );

  passwordMatchValidator(control: AbstractControl) {
    const password = control.get('password')?.value;
    const passwordConfirm = control.get('passwordConfirm')?.value;

    return password === passwordConfirm ? null : { mismatch: true };
  }

  onSubmit() {
    const { name, role, businessName, email, password } = this.signupForm.value;

    if (this.signupForm.invalid) return;

    this.authService
      .signup(name!, role!, businessName!, email!, password!)
      .subscribe(({ name, businessName, role, access_token }: any) => {
        localStorage.setItem('name', name);
        localStorage.setItem('businessName', businessName);
        localStorage.setItem('role', role);
        localStorage.setItem('access_token', access_token);
        this.router.navigate(['/dashboard/all-projects']);
      });
  }
}
