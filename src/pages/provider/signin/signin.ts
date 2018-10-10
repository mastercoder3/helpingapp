import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { SignupPage } from '../signup/signup';
import {TabsPage} from '../tabs/tabs';
import { AuthProvider } from '../../../providers/auth/auth';
import { ApiProvider } from '../../../providers/api/api';
@Component({
  selector: 'page-signin',
  templateUrl: 'signin.html'
})
export class SigninPage {
  email;
  password;

  constructor(public navCtrl: NavController,
    private api: ApiProvider,
    private auth: AuthProvider
    ) { 
    }
  
  signin(){
    if(this.email != '' && this.password != ''){
      this.auth.login(this.email, this.password)
        .then(res => {
          localStorage.setItem('wid', res.user.uid);
          this.navCtrl.push(TabsPage);
        }, err => {
          console.log(err.message)
        })
    }
  }


  signup(){
     this.navCtrl.push(SignupPage);
   }


}
