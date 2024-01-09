import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './sidebar.component.html',
})
export class SidebarComponent {
  public name = localStorage.getItem('name') || 'User';
  public businessName = localStorage.getItem('businessName') || 'Business';
  public role = localStorage.getItem('role') || 'Role';
}
