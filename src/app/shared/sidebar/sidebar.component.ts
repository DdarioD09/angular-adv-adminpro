import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { User } from 'src/app/models/user.model';
import { SidebarService } from 'src/app/services/sidebar.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: [
  ]
})
export class SidebarComponent {
  menuItems!: any[];
  user!: User

  constructor(private sidebarService: SidebarService, private userService: UserService, private router: Router) {
    this.menuItems = this.sidebarService.menu;
    this.user = this.userService.user;
  }

  logout() {
    localStorage.removeItem('token');
    this.user.google ? this.userService.googleLogout() : this.router.navigateByUrl('/login');
  }

}
