import { Component, OnInit } from '@angular/core';
import { NavController } from 'ionic-angular';
import {map} from 'rxjs/operators';

import { ManageaddressPage } from '../manageaddress/manageaddress';
import { ContactPage } from '../contact/contact';
import { PrivacyPage } from '../privacy/privacy';
import { AboutPage } from '../about/about';
import { FaqsPage } from '../faqs/faqs';
import { SigninPage } from '../signin/signin';
import { ApiProvider } from '../../providers/api/api';

@Component({
  selector: 'page-account',
  templateUrl: 'account.html'
})
export class AccountPage {

  user;
  image: string = './../../assets/imgs/profile2.png';

  constructor(public navCtrl: NavController, private api: ApiProvider) {

  } 

  ngOnInit(){
    this.getData(localStorage.getItem('uid'));
  }

  getData(id){
  this.api.getUserData(id)
      .pipe(map(actions => {
        const data = actions.payload.data();
        const did = actions.payload.id;
        return {did, ...data};
      }))
      .subscribe(res => {
        this.user = res;

      })
  }

  edit(){
    console.log('yees');
  }


 manageaddress(){
   this.navCtrl.push(ManageaddressPage);
   }
   contact(){
   this.navCtrl.push(ContactPage);
   }
   privacy(){
   this.navCtrl.push(PrivacyPage);
   }
   about(){
   this.navCtrl.push(AboutPage);
   }    
   faqs(){
   this.navCtrl.push(FaqsPage);
   }

   signin(){
   localStorage.removeItem('uid');
   this.navCtrl.push(SigninPage);
   }

}
