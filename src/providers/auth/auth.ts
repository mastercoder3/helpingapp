import { Injectable } from '@angular/core';
import {AngularFireAuth} from '@angular/fire/auth';
import * as firebase from 'firebase';

/*
  Generated class for the AuthProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class AuthProvider {
  provider;

  constructor(private auth: AngularFireAuth) {
    this.provider = new firebase.auth.FacebookAuthProvider();
  }

  signinWithFacebook(){
    return this.auth.auth.signInWithPopup(this.provider);
  }

}
