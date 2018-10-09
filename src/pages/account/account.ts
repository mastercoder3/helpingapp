import { Component, OnInit } from '@angular/core';
import { NavController, App } from 'ionic-angular';
import {map} from 'rxjs/operators';

import { ManageaddressPage } from '../manageaddress/manageaddress';
import { ApiProvider } from '../../providers/api/api';
import { StartPage } from '../startpage/start';

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
     this.navCtrl.push(ManageaddressPage, {
       address: this.user.address,
       city: this.user.city,
       phone: this.user.phone
     });
  }
 

   signin(){
     
   localStorage.removeItem('uid');
   this.navCtrl.setRoot(StartPage);
   }

}
