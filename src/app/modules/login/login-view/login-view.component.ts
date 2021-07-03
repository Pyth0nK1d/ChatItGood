import { Component, NgZone, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth-service/auth.service';
@Component({
  selector: 'app-login-view',
  templateUrl: './login-view.component.html',
  styleUrls: ['./login-view.component.css']
})
export class LoginViewComponent implements OnInit {

  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
  });

  constructor(public authService: AuthService, public router: Router) { }

  ngOnInit() {
    this.disableLoader();
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required]),
    });
  }

  onSubmit() {
    this.enableLoader();
    this.authService.SignIn(this.loginForm.value.email, this.loginForm.value.password);
    /*
    // TODO: Change this for auth method statement
    if(this.loginForm.value.email === 'dprieto93@hotmail.com'){
      this.router.navigate(['/chat']);
    }
    */
  }

  private enableLoader(){
    if(typeof objDiv === "undefined"){
      var objDiv = document.getElementById("loader");
    }
    objDiv.style.display = "block";
  }

  private disableLoader(){
    if(typeof objDiv === "undefined"){
      var objDiv = document.getElementById("loader");
    }
    objDiv.style.display = "none";
  }

}
