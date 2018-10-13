import { Component, OnInit } from '@angular/core';
import { NavController } from 'ionic-angular';

 import { MyprofilePage } from '../myprofile/myprofile';
import {StartPage} from './../../startpage/start';
import { ApiProvider } from '../../../providers/api/api';
import {map} from 'rxjs/operators';
import { HelperProvider } from '../../../providers/helper/helper';

@Component({
  selector: 'page-account',
  templateUrl: 'account.html'
})
export class AccountPage implements OnInit{

  worker;
  status: boolean = false;
  constructor(public navCtrl: NavController, private api: ApiProvider, private helper: HelperProvider) {

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
        this.status = this.worker.status;
      })
  }

  onChange(){
    let online = 'online';
    if(!this.status) {online = 'offline'}
    this.worker.status = this.status;
    let data = this.worker;
    delete data['did'];
    console.log(data);
    this.api.updateWorker(localStorage.getItem('wid'),data)
    .then(res => {
      this.helper.presentToast(`Your status is changed to ${online}`);
    }, err => {
      this.helper.presentToast('Unable to change your Status');
    })
  }
  
  myprofile(){
   this.navCtrl.push(MyprofilePage);
   }

  //  packages(){
  //  this.navCtrl.push(PackagesPage);
  //  }
  //  conatctus(){
  //  this.navCtrl.push(ConatctusPage);
  //  }
  //  privacy(){
  //  this.navCtrl.push(PrivacyPage);
  //  }
  //  aboutus(){
  //  this.navCtrl.push(AboutusPage);
  //  }
  //  faqs(){
  //  this.navCtrl.push(FaqsPage);
  //  } 
   signin(){
    localStorage.removeItem('wid');
    this.navCtrl.setRoot(StartPage);
   }


}
