import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth-service/auth.service';
import { StorageService } from 'src/app/services/storage/storage.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-profile-view',
  templateUrl: './profile-view.component.html',
  styleUrls: ['./profile-view.component.css']
})
export class ProfileViewComponent implements OnInit {

  public userData = null;
  fileToUpload: File | null = null;

  profileForm = new FormGroup({
    alias: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', []),
    repeatPassword: new FormControl('', []),
  });

  
  constructor(public authService: AuthService, public afAuth: AngularFireAuth, private storage: StorageService) { }

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
          photoURL: "/assets/img/default-image.png"
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

  async handleFileInput(files: FileList) {
    this.enableLoader();
    this.fileToUpload = files.item(0);
    let metadata = { name: this.fileToUpload.name, size: this.fileToUpload.size };
    await this.storage.createImage(`${this.fileToUpload.name}`, this.fileToUpload, metadata);
    this.storage.getImage(this.fileToUpload.name)
      .subscribe((url: string) => {
        this.authService.UpdateProfileImage(url);
        this.userData.photoURL = url;
        this.disableLoader();
      });
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

  async onSubmit() {
    this.enableLoader();
    await this.authService.UpdateProfile(this.profileForm.value.alias, this.profileForm.value.email, this.profileForm.value.password);
    this.disableLoader();
  }

}
