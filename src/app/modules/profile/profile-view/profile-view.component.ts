import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AuthService } from 'src/app/services/auth-service/auth.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-profile-view',
  templateUrl: './profile-view.component.html',
  styleUrls: ['./profile-view.component.css']
})
export class ProfileViewComponent implements OnInit {

  public userData = null;
  
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

}
