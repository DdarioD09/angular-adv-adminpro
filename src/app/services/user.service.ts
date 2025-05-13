import { HttpClient } from '@angular/common/http';
import { Injectable, NgZone } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { Router } from '@angular/router';

import { environment } from '../../environments/environment';
import { RegisterForm } from '../interfaces/register-form.interface';
import { LoginForm } from '../interfaces/login-form.interface';
import { User } from '../models/user.model';

declare const google: any;

const base_url = environment.apiUrl;

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private isGoogleInitialized = false;
  user!: User;

  constructor(private http: HttpClient, private ngZone: NgZone, private router: Router) { }

  createUser(formData: RegisterForm): Observable<RegisterForm> {
    return this.http.post(`${base_url}/users`, formData)
      .pipe(
        tap((resp: any) => {
          localStorage.setItem('token', resp.token)
        })
      );
  }

  login(formData: LoginForm): Observable<LoginForm> {
    return this.http.post(`${base_url}/login`, formData)
      .pipe(
        tap((resp: any) => {
          localStorage.setItem('token', resp.token);
        })
      );
  }

  tokenValidation(): Observable<boolean> {
    const token = localStorage.getItem('token') || '';

    return this.http.get(`${base_url}/login/renew`, {
      headers: {
        'x-token': token
      }
    })
      .pipe(
        map((resp: any) => {
          const { name, email, role, img, uid } = resp.user
          this.user = new User(name, email, '', img, role, google, uid);
          localStorage.setItem('token', resp.token);
          return true
        }),
        catchError(() => of(false))
      );
  }

  // GOOGLE Services to manage the user loging and logout

  initializeGoogle(callback: (response: any) => void) {
    if (this.isGoogleInitialized) return;

    google.accounts.id.initialize({
      client_id: '1057518198025-jssfnclomq5dufvvj1nfvqs4qe00vont.apps.googleusercontent.com',
      callback: (response: any) => {
        this.ngZone.run(() => callback(response));
      }
    });

    this.isGoogleInitialized = true;
  }

  renderGoogleButton(target: HTMLElement, options: any = {}) {
    if (!google) return;
    google.accounts.id.renderButton(
      target,
      { theme: "outline", size: "large", ...options } // customization attributes
    );
  }

  googleLogin(token: string): Observable<string> {
    return this.http.post(`${base_url}/login/google`, { token })
      .pipe(
        tap((resp: any) => {
          localStorage.setItem('token', resp.token);
        })
      )
  }

  googleLogout() {
    google.accounts.id.revoke('dariod.dazaa09@gmail.com', () => {
      console.log('consent revoked');
      this.router.navigateByUrl('/login')
    });
  }
}
