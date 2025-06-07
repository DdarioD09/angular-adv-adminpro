import { HttpClient } from '@angular/common/http';
import { Injectable, NgZone } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { Router } from '@angular/router';

import { environment } from '../../environments/environment';
import { RegisterForm } from '../interfaces/register-form.interface';
import { LoginForm } from '../interfaces/login-form.interface';
import { User } from '../models/user.model';
import { loadUsers } from '../interfaces/load-users.interface';

declare const google: any;

const base_url = environment.apiUrl;

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private isGoogleInitialized = false;
  user!: User;

  constructor(private http: HttpClient, private ngZone: NgZone, private router: Router) { }

  get token(): string {
    return localStorage.getItem('token') || '';
  }

  get uid(): string {
    return this.user.uid || '';
  }

  get role(): 'ADMIN_ROLE' | 'USER_ROLE' {
    return this.user.role || 'USER_ROLE';
  }

  get headers() {
    return {
      headers: { 'x-token': this.token }
    }
  }

  setLocalStorage(token: string, menu: any) {
    localStorage.setItem('token', token);
    localStorage.setItem('menu', JSON.stringify(menu));
  }

  // Auth Services

  createUser(formData: RegisterForm): Observable<RegisterForm> {
    return this.http.post(`${base_url}/users`, formData)
      .pipe(
        tap((resp: any) => this.setLocalStorage(resp.token, resp.menu))
      );
  }

  login(formData: LoginForm): Observable<LoginForm> {
    return this.http.post(`${base_url}/login`, formData)
      .pipe(
        tap((resp: any) => this.setLocalStorage(resp.token, resp.menu))
      );
  }

  tokenValidation(): Observable<boolean> {

    return this.http.get(`${base_url}/login/renew`, this.headers)
      .pipe(
        map((resp: any) => {
          const { name, email, role, google, img, uid } = resp.user;
          this.user = new User(name, email, '', img, role, google, uid);
          this.setLocalStorage(resp.token, resp.menu);
          return true
        }),
        catchError(() => of(false))
      );
  }

  updateProfile(data: { email: string, name: string, role: string }) {
    data = {
      ...data,
      role: this.user.role || ''
    }
    return this.http.put(`${base_url}/users/${this.uid}`, data, this.headers);
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
        tap((resp: any) => this.setLocalStorage(resp.token, resp.menu))
      );
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('menu');

    if (this.user.google) {
      google.accounts.id.revoke(this.user.email, () => { });
    }
    this.router.navigateByUrl('/login');
  }

  // User maintenance

  loadUsers(from: number = 0) {
    const url = `${base_url}/users?from=${from}`;
    return this.http.get<loadUsers>(url, this.headers).pipe(
      map(resp => {
        const users = resp.users.map((user: User) => {
          return new User(user.name, user.email, '', user.img, user.role, user.google, user.uid);
        });
        return { total: resp.total, users }
      })
    );
  }

  deleteUser(uid: string = '') {
    return this.http.delete(`${base_url}/users/${uid}`, this.headers);
  }

  updateUser(user: User) {
    return this.http.put(`${base_url}/users/${user.uid}`, user, this.headers);
  }

}
