import { Injectable } from '@angular/core';
import {AngularFireAuth} from '@angular/fire/auth';
import * as firebase from 'firebase';
import { Facebook } from '@ionic-native/facebook';

/*
  Generated class for the AuthProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class AuthProvider {
  provider;

  constructor(private auth: AngularFireAuth, private facebook: Facebook) {
   // this.provider = new firebase.auth.FacebookAuthProvider();
  }

  signinWithFacebook(){
    return this.auth.auth.signInWithPopup(this.provider);
  }

  facebookSignin(provider){
      return firebase.auth().signInWithCredential(provider);   
  }

  facebookLogin(): Promise<any> {
    return this.facebook.login(['email']);
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
