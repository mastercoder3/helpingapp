import { Component, OnInit } from '@angular/core';
import { NavController } from 'ionic-angular';
import {AuthProvider} from './../../providers/auth/auth';

import { TabsPage } from '../tabs/tabs';
import { ApiProvider } from '../../providers/api/api';
import * as firebase from 'firebase';
import { HelperProvider } from '../../providers/helper/helper';

@Component({
  selector: 'page-signin',
  templateUrl: 'signin.html'
})
export class SigninPage {

  user;
  facebook;
  image: string = '';

  constructor(public navCtrl: NavController, private auth: AuthProvider, private api: ApiProvider, private helper: HelperProvider) {

  } 

  ngOnInit(){
    localStorage.setItem('uid','JraEcOZ6ELcnXv3EN7xM3iZdfS83');
    if(localStorage.getItem('uid')){
      this.navCtrl.push(TabsPage);
    }
  }

  start(){
    this.navCtrl.pop();
  }

    signin(){
      this.auth.facebookLogin()
        .then(ress => {
          const provider = firebase.auth.FacebookAuthProvider
          .credential(ress.authResponse.accessToken);

          this.auth.facebookSignin(provider)
          .then(res => {
            this.facebook = res;
            let id = this.facebook.user.uid;
            this.helper.presentToast(id);
            let isNewUser = this.facebook.additionalUserInfo.isNewUser;
            if(isNewUser === false){
              localStorage.setItem('uid',this.facebook.user.uid);
              this.navCtrl.push(TabsPage);
            }
            else if(isNewUser === true){
              //data 
              this.user.firstName = this.facebook.additionalUserInfo.profile.first_name;
              this.user.email =  this.facebook.additionalUserInfo.profile.email;
              this.user.lastName =  this.facebook.additionalUserInfo.profile.last_name;
              this.user.imageURL =  this.facebook.additionalUserInfo.profile.picture.data.url;
              this.user.name = this.facebook.additionalUserInfo.profile.name;
              //creating user in the database
              this.api.createUser(this.facebook.user.uid, this.user)
                .then(response => {
                  localStorage.setItem('uid',this.facebook.user.uid);
                  this.navCtrl.push(TabsPage);
                }, err => {
                  console.log(err);
                })
  
            }
          },err =>{
            console.log(err)
          })



        })
     
    }


}
