import { Injectable } from '@angular/core';
import * as firebase from 'firebase';
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }

  logIn(email: string, password: string){
    return(
      new Promise(
        (resolve, reject) => {
          firebase.auth().signInWithEmailAndPassword(email, password).then(
            () => resolve(true)
          ),
          (error) => reject(error)
        }
      )
    )
  }
  createUser(email: string, password: string){
    return new Promise(
      (resolve, reject) => {
        firebase.auth().createUserWithEmailAndPassword(email, password).then(
          () => resolve(true)
        ),
        (error) => reject(error)
      }
    )
  }

  logOut(){
    firebase.auth().signOut();
  }
}
