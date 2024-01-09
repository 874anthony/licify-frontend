import { Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterLink, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styles: ``,
})
export class LoginComponent {
  constructor(private authService: AuthService, private router: Router) {}

  public loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
  });

  onSubmit() {
    const { email, password } = this.loginForm.value;

    if (this.loginForm.invalid) return;

    this.authService
      .login(email!, password!)
      .subscribe(({ name, businessName, role, access_token }: any) => {
        localStorage.setItem('name', name);
        localStorage.setItem('businessName', businessName);
        localStorage.setItem('role', role);
        localStorage.setItem('access_token', access_token);
        this.router.navigate(['/dashboard/all-projects']);
      });
  }
}
