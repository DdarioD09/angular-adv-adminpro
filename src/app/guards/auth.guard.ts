import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { UserService } from '../services/user.service';
import { map, tap } from 'rxjs';


// this an aproach using new signal-based guards introduced on Angular 17
export const authGuard: CanActivateFn = () => {
  const router = inject(Router);

  return inject(UserService).tokenValidation()
    .pipe(
      tap((isAuthenticated: boolean) => {
        if (!isAuthenticated) {
          router.navigateByUrl('/login')
        }
      })
    );

  // return inject(UserService).tokenValidation()
  //   .pipe(
  //     map((isAuthenticated: boolean) => {
  //       return isAuthenticated ? true : router.parseUrl('/login')
  //     })
  //   )
};
