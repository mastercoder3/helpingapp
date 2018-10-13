import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

 import { TabsPage } from '../tabs/tabs';
 import { ForgotpasswordPage } from '../forgotpassword/forgotpassword';
@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html'
})
export class SignupPage {

  constructor(public navCtrl: NavController) {

  } 
 tabs(){

    this.navCtrl.push(TabsPage);
    }
    forgotpassword(){
    this.navCtrl.push(ForgotpasswordPage);
    }


}
