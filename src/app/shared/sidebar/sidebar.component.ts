import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './sidebar.component.html',
})
export class SidebarComponent implements OnInit {
  public name: string = '';
  public businessName: string = '';
  public role: string = '';
  public avatar: string = '';

  public defaultImage = 'https://via.placeholder.com/150';

  constructor(private userService: UserService, private router: Router) {}

  ngOnInit(): void {
    this.userService.getCurrentUser().subscribe((user) => {
      this.name = user.name;
      this.businessName = user.businessName;
      this.role = user.role;
      this.avatar = user.avatar ?? this.defaultImage;
    });
  }

  logOut(): void {
    localStorage.clear();
    this.router.navigate(['/login']);
  }
}
