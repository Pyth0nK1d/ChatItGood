import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth-service/auth.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-profile-view',
  templateUrl: './profile-view.component.html',
  styleUrls: ['./profile-view.component.css']
})
export class ProfileViewComponent implements OnInit {

  public userData = null;

  profileForm = new FormGroup({
    alias: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', []),
    repeatPassword: new FormControl('', []),
  });

  
  constructor(public authService: AuthService, public afAuth: AngularFireAuth) { }

  ngOnInit() {
    //this.userData = JSON.parse(localStorage.getItem('user'));
    var currentUser;
    this.afAuth.onAuthStateChanged(user => {
      if (user) {
          currentUser = user;
          localStorage.setItem('user',JSON.stringify(currentUser));
          if(localStorage.getItem('user') !== null){
            this.userData = JSON.parse(localStorage.getItem('user'));
          }
      }else{
        currentUser = {
          photoURL: environment.baseWebUrl+"/assets/img/default-image.png"
        };
        this.userData = currentUser;
      }
    });
    
  }

  logout(){
    this.authService.SignOut();
  }

  onPasswordChange() {
    if(this.password.value.length < 6){
      this.password.setErrors({ minlength: true });
    }
    if (this.repeat_password.value == this.password.value) {
      this.repeat_password.setErrors(null);
    } else {
      this.repeat_password.setErrors({ mismatch: true });
    }
  }
  
  get password(): AbstractControl {
    return this.profileForm.controls['password'];
  }
  
  get repeat_password(): AbstractControl {
    return this.profileForm.controls['repeatPassword'];
  }

  onSubmit() {
    //console.warn(this.registerForm.errors);
    //this.authService.SignUp(this.profileForm.value.email, this.profileForm.value.password, this.profileForm.value.alias);
    //this.authService.SignIn(this.registerForm.value.email, this.registerForm.value.password);
    this.authService.UpdateProfile(this.profileForm.value.alias, this.profileForm.value.email, this.profileForm.value.password);
  }

}
