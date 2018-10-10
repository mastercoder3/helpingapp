import { Component, OnInit } from '@angular/core';
import { NavController } from 'ionic-angular';

 import { MyprofilePage } from '../myprofile/myprofile';
 import { PackagesPage } from '../packages/packages';
 import { ConatctusPage } from '../conatctus/conatctus';
 import { PrivacyPage } from '../privacy/privacy';
 import { AboutusPage } from '../aboutus/aboutus';
 import { FaqsPage } from '../faqs/faqs';
 import { SigninPage } from '../signin/signin';
import { ApiProvider } from '../../../providers/api/api';
import {map} from 'rxjs/operators';

@Component({
  selector: 'page-account',
  templateUrl: 'account.html'
})
export class AccountPage implements OnInit{

  worker;

  constructor(public navCtrl: NavController, private api: ApiProvider) {

  }

  ngOnInit(){
    this.getData(localStorage.getItem('wid'));
  }

  getData(id){
    this.api.getWorkerProfile(id)
      .pipe(map(actions => {
        const data = actions.payload.data();
        const did = actions.payload.id;
        return {did, ...data};
      }))

      .subscribe(res =>{
        this.worker = res;
      })
  }
  
  myprofile(){
   this.navCtrl.push(MyprofilePage);
   }

   packages(){
   this.navCtrl.push(PackagesPage);
   }
   conatctus(){
   this.navCtrl.push(ConatctusPage);
   }
   privacy(){
   this.navCtrl.push(PrivacyPage);
   }
   aboutus(){
   this.navCtrl.push(AboutusPage);
   }
   faqs(){
   this.navCtrl.push(FaqsPage);
   } 
   signin(){
   this.navCtrl.push(SigninPage);
   }


}
