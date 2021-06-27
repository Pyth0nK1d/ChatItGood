import { Component, NgZone, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth-service/auth.service';
@Component({
  selector: 'app-login-view',
  templateUrl: './login-view.component.html',
  styleUrls: ['./login-view.component.css']
})
export class LoginViewComponent {

  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
  });

  constructor(public authService: AuthService, public router: Router) { }

  onSubmit() {
    this.authService.SignIn(this.loginForm.value.email, this.loginForm.value.password);
    this.router.navigate(['/chat']); 
    /*
    // TODO: Change this for auth method statement
    if(this.loginForm.value.email === 'dprieto93@hotmail.com'){
      this.router.navigate(['/chat']);
    }
    */
  }

}
