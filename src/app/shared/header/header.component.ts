import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { User } from '../../models/user.model';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styles: [
  ]
})
export class HeaderComponent {
  user!: User;

  constructor(private userService: UserService, private router: Router) {
    this.user = this.userService.user;
  }

  logout() {
    localStorage.removeItem('token');
    this.user.google ? this.userService.googleLogout() : this.router.navigateByUrl('/login');
  }

}
