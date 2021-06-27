import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth-service/auth.service';

@Component({
  selector: 'app-register-view',
  templateUrl: './register-view.component.html',
  styleUrls: ['./register-view.component.css']
})
export class RegisterViewComponent {

  registerForm = new FormGroup({
    alias: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(6)]),
    repeatPassword: new FormControl('', [Validators.required]),
  });

  constructor(public authService: AuthService) { }

  onPasswordChange() {
    if (this.repeat_password.value == this.password.value) {
      this.repeat_password.setErrors(null);
    } else {
      this.repeat_password.setErrors({ mismatch: true });
    }
  }
  
  get password(): AbstractControl {
    return this.registerForm.controls['password'];
  }
  
  get repeat_password(): AbstractControl {
    return this.registerForm.controls['repeatPassword'];
  }

  onSubmit() {
    //console.warn(this.registerForm.errors);
    this.authService.SignUp(this.registerForm.value.email, this.registerForm.value.password, this.registerForm.value.alias);
    //this.authService.SignIn(this.registerForm.value.email, this.registerForm.value.password);
  }

}
