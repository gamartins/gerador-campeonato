import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { Observable } from 'rxjs/Observable';
import * as firebase from 'firebase/app';

@Injectable()
export class AuthProvider {
  uid
  user: Observable<firebase.User>;

  constructor(private angularFireAuth: AngularFireAuth) {
    this.user = angularFireAuth.authState
    this.user.subscribe(val => val !== null ? this.uid = val.uid : '')
  }

  loginWithEmailAndPassword(email: string, password: string) {
    return this.angularFireAuth.auth.signInWithEmailAndPassword(email, password)
  }

  isUserSignIn(){
    let isLogged = false
    let user = this.angularFireAuth.auth.currentUser
    if(user) isLogged = true

    return isLogged
  }

}
