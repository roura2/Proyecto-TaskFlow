import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent {

  loginUser: FormGroup;
  loading: boolean = false;

  // Patterns
  usernamePattern: string = '([a-zA-Z]+) ([a-zA-Z]+)';
  emailPattern: string = '^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$';

  constructor(
    private authService: AuthService,
    private router: Router,
    private toastr: ToastrService,
    private fb: FormBuilder) {

      this.loginUser = this.fb.group({
        email: [null, [Validators.required, Validators.pattern(this.emailPattern)]],
        password: [null, Validators.required]
      });
  }

  invalidCamp(campo: string) {
    return this.loginUser.get(campo)?.invalid
      && this.loginUser.get(campo)?.touched
  }

  getClassCSS(campo: string): string {
    return (this.loginUser.get(campo)?.invalid && this.loginUser.get(campo)?.touched)
      ? "form-control is-invalid"
      : "form-control";
  }

  get emailErrorMsg(): string {
    const errors = this.loginUser.get('email')?.errors;

    if (errors?.['required']) {
      return 'The email is required';
    } else if (errors?.['pattern']) {
      return 'The email is invalid';
    }

    return '';
  }

  get passwordErrorMsg(): string {
    const errors = this.loginUser.get('password')?.errors;

    if (errors?.['required']) {
      return 'The password is required';
    }

    return '';
  }

  login() {
    const email = this.loginUser.value.email;
    const password = this.loginUser.value.password;

    this.loading = true;
    this.authService.signIn(email, password)
      .then(resp => {
        // console.log(resp);
        this.router.navigate(['/tasks/list-task'])
      });
  }


}
