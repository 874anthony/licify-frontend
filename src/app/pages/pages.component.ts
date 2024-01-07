import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { SidebarComponent } from '../shared/sidebar/sidebar.component';

@Component({
  selector: 'app-pages',
  standalone: true,
  imports: [SidebarComponent, RouterOutlet],
  templateUrl: './pages.component.html',
  styles: ``,
})
export class PagesComponent {}
