import { Injectable, NgZone } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router,
} from '@angular/router';
import { Observable } from 'rxjs';
import firebase from 'firebase/app';
import 'firebase/auth';
import { AngularFireAuth } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router, public afAuth: AngularFireAuth, public ngZone: NgZone) {}
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean | Observable<boolean> | Promise<boolean> {
    return new Promise((resolve, reject) => {
      this.afAuth.onAuthStateChanged((user: firebase.User) => {
        if (user) {
          resolve(true);
        } else {
            this.ngZone.run(() => {
                //console.log(localStorage.getItem('user'));
                this.router.navigate(['/login']);
            }); 
          
          //resolve(false);
        }
      });
    });
  }
}
