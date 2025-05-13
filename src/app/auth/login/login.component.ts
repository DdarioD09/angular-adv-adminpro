import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

import { LoginForm } from '../../interfaces/login-form.interface';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements AfterViewInit {
  @ViewChild('googleBtn') googleBtnRef!: ElementRef;

  formSubmited = false;

  loginForm = this.fb.group(
    {
      email: [localStorage.getItem('email') || '', [Validators.required, Validators.email]],
      password: ['1234', Validators.required],
      remember: false
    })

  constructor(private router: Router, private fb: FormBuilder, private userService: UserService) { }

  ngAfterViewInit(): void {
    this.googleInit();
  }

  googleInit() {
    this.userService.initializeGoogle((response) => this.handleCredentialResponse(response));

    this.userService.renderGoogleButton(this.googleBtnRef.nativeElement);
    // google.accounts.id.prompt(); // also display the One Tap dialog
  }

  handleCredentialResponse(response: any) {
    this.userService.googleLogin(response.credential).subscribe(
      {
        next: () => this.router.navigateByUrl('/'),
        error: (e) => {
          console.warn(e)
          Swal.fire({
            icon: "error",
            title: "Error",
            text: e.error.msg,
          });
        }
      }
    )
  }

  login() {
    this.formSubmited = true;

    if (this.loginForm.valid) {
      this.userService.login(this.loginForm.value as LoginForm).subscribe({
        next: () => {
          if (this.loginForm.get('remember')?.value) {
            localStorage.setItem('email', this.loginForm.get('email')?.value as string);
          } else {
            localStorage.removeItem('email');
          }
          this.router.navigateByUrl('/');
        },
        error: (e) => {
          console.warn(e)
          Swal.fire({
            icon: "error",
            title: "Error",
            text: e.error.msg,
          });
        }
      });
    } else {
      console.log('form invalid');

    }
  }

  invalidField(field: string): boolean {
    return this.loginForm.get(field)?.invalid && this.formSubmited ? true : false
  }

}
