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

  login(email, password){
    return  this.auth.auth.signInWithEmailAndPassword(email,password);
  }

  signup(email,password){
    return this.auth.auth.createUserWithEmailAndPassword(email,password);
  }

  sendVerificationEmail(){
    return this.auth.auth.currentUser.sendEmailVerification();
  }

  setPersistance(){
    return this.auth.auth.setPersistence(firebase.auth.Auth.Persistence.SESSION);
  }

  forgotPassword(email){
    return this.auth.auth.sendPasswordResetEmail(email);
  }

  resetPassword(password){
    const user = firebase.auth().currentUser;
    user.updatePassword(password);
    return user;
  }
}
