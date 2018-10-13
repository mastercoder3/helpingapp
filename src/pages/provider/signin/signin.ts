import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { SignupPage } from '../signup/signup';
import {TabsPage} from '../tabs/tabs';
import { AuthProvider } from '../../../providers/auth/auth';
import { ApiProvider } from '../../../providers/api/api';
import { HelperProvider } from '../../../providers/helper/helper';
@Component({
  selector: 'page-signin',
  templateUrl: 'signin.html'
})
export class SigninPage {
  email;
  password;

  constructor(public navCtrl: NavController,
    private api: ApiProvider,
    private auth: AuthProvider,
    private helper: HelperProvider
    ) { 
    }
  
  signin(){
    if( (this.email !== '' || this.email !== undefined ) && ( this.password !== '' || this.password !== undefined)){
      this.helper.presentLoadingDefault();
      this.auth.login(this.email, this.password)
        .then(res => {
          if(res.user.emailVerified === true){
            this.auth.setPersistance().then( () => {
              this.helper.closeLoading();
              localStorage.setItem('wid', res.user.uid);
              this.navCtrl.push(TabsPage);
            })
          }
          else if (res.user.emailVerified === false) {
            this.helper.closeLoading();
            this.helper.showAlertWithoutInput('Email verification','Email verification Required!','Resend Email',()=>{
              //on success
              this.resend();
            });
          }

        }, err => {
          this.helper.closeLoading();
          this.helper.presentToast(err.message);
        });
    }
    else {
      this.helper.presentToast('Please Provide Email and Password.')
    }
  }

  resend(){
    this.auth.sendVerificationEmail()
      .then(data =>{
        this.helper.presentToast('Email Sent! Check your inbox.');

      }, err=>{
        this.helper.presentToast(`Error Sending Email. ${err.message}`);
      });
  }


  signup(){
     this.navCtrl.push(SignupPage);
   }

   forgotPassword(){
     let myFunct = (res) => {
        this.auth.forgotPassword(res.email)
          .then(res => {
            this.helper.presentToast('Check your Inbox for Password Reset Email.');
          }, err => {
            this.helper.presentToast(err.message);
          })
     };
    this.helper.showPromptSignle('Reset Password','Email is required in order to recieve reset password email','email','Your Email',myFunct,'Save');
   }


}
