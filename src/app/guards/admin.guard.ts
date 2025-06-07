import { CanActivateFn, Router } from '@angular/router';
import { UserService } from '../services/user.service';
import { inject } from '@angular/core';

export const adminGuard: CanActivateFn = () => {
  const userService = inject(UserService);
  const router = inject(Router);

  if (userService.role !== 'ADMIN_ROLE') {
    router.navigateByUrl('/dashboard');
    return false;
  }
  return true;
};
