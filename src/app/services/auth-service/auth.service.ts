import { Injectable, NgZone } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  userData: any; // Save logged in user data

  constructor(
    public afs: AngularFirestore,   // Inject Firestore service
    public afAuth: AngularFireAuth, // Inject Firebase auth service
    public router: Router,  
    public ngZone: NgZone // NgZone service to remove outside scope warning
  ) {    
    /* Saving user data in localstorage when 
    logged in and setting up null when logged out */
    
    this.afAuth.authState.subscribe(user => {
      if (user) {
        this.userData = user;
        localStorage.setItem('user', JSON.stringify(this.userData));
        //JSON.parse(localStorage.getItem('user'));
      } else {
        this.userData = null;
        localStorage.removeItem('user');
        //JSON.parse(localStorage.getItem('user'));
      }
    })
    
  }

  // Sign in with email/password
  SignIn(email, password) {
    return this.afAuth.signInWithEmailAndPassword(email, password)
      .then((result) => {
        //TODO: This update is required to include user extra data, use it for register
        /*
        result.user.updateProfile({
          displayName: "Tabi93",
          photoURL: "https://i.redd.it/jeuusd992wd41.jpg"
        }).then(() => {
          this.SetUserData(result.user);
          this.ngZone.run(() => {
            this.router.navigate(['/chat']);
          });
        });
        */
        this.SetUserData(result.user);
        this.ngZone.run(() => {
          //console.log(localStorage.getItem('user'));
          this.router.navigate(['/chat']); 
        });   
        //this.router.navigate(['/chat']); 
        
      }).catch((error) => {
        window.alert(error.message)
      })
  }

  // Sign up with email/password
  SignUp(email, password,alias) {
    return this.afAuth.createUserWithEmailAndPassword(email, password)
      .then((result) => {
        /* Call the SendVerificaitonMail() function when new user sign 
        up and returns promise */

        result.user.updateProfile({
          displayName: alias,
          photoURL: "/assets/img/default-image.png"
        }).then(() => {
          this.SignIn(email, password);
          //this.SetUserData(result.user);
        });
        
        // TODO: In a future version release
        //this.SendVerificationMail();
        
        //this.SetUserData(result.user);
      }).catch((error) => {
        window.alert(error.message)
      })
  }

  /* TODO: In a future version release
  // Send email verfificaiton when new user sign up
  SendVerificationMail() {
    return this.afAuth.auth.currentUser.sendEmailVerification()
    .then(() => {
      this.router.navigate(['verify-email-address']);
    })
  }
  */

  /* TODO: In a future version release
  // Reset Forggot password
  ForgotPassword(passwordResetEmail) {
    return this.afAuth.auth.sendPasswordResetEmail(passwordResetEmail)
    .then(() => {
      window.alert('Password reset email sent, check your inbox.');
    }).catch((error) => {
      window.alert(error)
    })
  }
  */

  async UpdateProfile(alias, email, password){
    return (await this.afAuth.currentUser).updateProfile({
      displayName: alias
    }).then(async () => {
      if(password.length > 0){
        (await this.afAuth.currentUser).updatePassword(password).then(function() {
          console.log("password updated");
        }).catch(function(error){
          console.error("Error al cambiar contraseña");
          console.log(error);
        });
      }
    });
    
    
  }

  async UpdateProfileImage(url){
    return (await this.afAuth.currentUser).updateProfile({
      //displayName: alias,
      photoURL: url
    }).then(async () => {
      //this.userData.photoURL = url;
      console.log("Profile image updated!");
    });
    
    
  }

  // Returns true when user is looged in and email is verified
  get isLoggedIn(): boolean {
    const user = JSON.parse(localStorage.getItem('user'));
    return (user !== null) ? true : false;
  }

  /* Setting up user data when sign in with username/password, 
  sign up with username/password and sign in with social auth  
  provider in Firestore database using AngularFirestore + AngularFirestoreDocument service */
  SetUserData(user) {
    const userRef: AngularFirestoreDocument<any> = this.afs.doc(`users/${user.uid}`);
    const userData: User = {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      photoURL: user.photoURL,
      //emailVerified: user.emailVerified
    }
    return userRef.set(userData, {
      merge: true
    })
  }

  // Sign out 
  SignOut() {
    return this.afAuth.signOut().then(() => {
      //localStorage.removeItem('user');
      this.router.navigate(['/login']);
    })
  }
}
