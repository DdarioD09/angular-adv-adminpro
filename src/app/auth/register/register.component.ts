import { Component } from '@angular/core';
import { AbstractControlOptions, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2'

import { RegisterForm } from '../../interfaces/register-form.interface';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  public formSubmited = false;

  public registerForm = this.fb.group(
    {
      name: ['Dario', [Validators.required, Validators.minLength(3)]],
      email: ['test100@gmail.com', [Validators.required, Validators.email]],
      password: ['1234', Validators.required],
      password2: ['1234', Validators.required],
      terms: [false, Validators.required],
    },
    {
      validators: [
        this.equalPasswordsValidation('password', 'password2'),
        this.termsAcceptedValidation('terms')
      ]
    } as AbstractControlOptions
  );

  constructor(private fb: FormBuilder, private userService: UserService, private router: Router) { }

  createUser() {
    this.formSubmited = true;
    if (this.registerForm.invalid) {
      return;
    }

    this.userService.createUser(this.registerForm.value as RegisterForm)
      .subscribe({
        next: () => this.router.navigateByUrl('/'),
        error: (e) => {
          console.warn(e)
          Swal.fire({
            icon: "error",
            title: "Error",
            text: e.error.msg,
          });
        }
      })
  }

  invalidField(field: string): boolean {
    return this.registerForm.get(field)?.invalid && this.formSubmited ? true : false;
  }

  invalidPasswords(): boolean {
    const pass1 = this.registerForm.get('password')?.value
    const pass2 = this.registerForm.get('password2')?.value
    return pass1 !== pass2 && this.formSubmited;
  }

  equalPasswordsValidation(pass1Name: string, pass2Name: string) {
    return (formGroup: FormGroup) => {
      const pass1Control = formGroup.get(pass1Name);
      const pass2Control = formGroup.get(pass2Name);

      if (pass1Control?.value === pass2Control?.value) {
        pass2Control?.setErrors(null);
      } else {
        pass2Control?.setErrors({ notEqual: true });
      }
    }
  }

  termsAccepted(): boolean {
    return !this.registerForm.get('terms')?.value as boolean && this.formSubmited;
  }

  termsAcceptedValidation(terms: string) {
    return (formGroup: FormGroup) => {
      const termsControl = formGroup.get(terms);

      if (termsControl?.value) {
        termsControl?.setErrors(null);
      } else {
        termsControl?.setErrors({ notAccepted: true })
      }
    }
  }
}
