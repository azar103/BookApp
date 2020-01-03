import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ActivatedRouteSnapshot, RouterStateSnapshot, CanActivate, Router, ActivatedRoute } from '@angular/router';
import * as  firebase from 'firebase';
@Injectable({
  providedIn: 'root'
})
export class AuthGuardService  implements CanActivate{

  constructor(private router: Router){}
  canActivate
    (): Observable<boolean> | Promise<boolean>  | boolean{
        return new Promise(
              (resolve, reject) => {
                 firebase.auth().onAuthStateChanged(
                   (user) => {
                     if(user){
                       resolve(true)
                     } else {
                        this.router.navigate(['/auth', 'sign-in']);
                        resolve(false);
                     }
                   }
                 )
              }

        )
    }
}
