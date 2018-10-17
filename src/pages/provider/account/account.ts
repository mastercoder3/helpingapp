import { Component, OnInit } from '@angular/core';
import { NavController, App } from 'ionic-angular';

 import { MyprofilePage } from '../myprofile/myprofile';
import {StartPage} from './../../startpage/start';
import { ApiProvider } from '../../../providers/api/api';
import {map} from 'rxjs/operators';
import { HelperProvider } from '../../../providers/helper/helper';
import { PackagesPage } from '../packages/packages';
import { ContactPage } from '../../contact/contact';
import { PrivacyPage } from '../../privacy/privacy';
import { AboutusPage } from '../aboutus/aboutus';
import { FaqsPage } from '../faqs/faqs';

@Component({
  selector: 'page-account',
  templateUrl: 'account.html'
})
export class AccountPage implements OnInit{

  worker;
  status: boolean = false;
  constructor(public navCtrl: NavController, private api: ApiProvider, private helper: HelperProvider, private app: App) {

  }

  ngOnInit(){
    this.helper.presentLoadingDefault();
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
        this.helper.closeLoading();
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

   packages(){
   this.navCtrl.push(PackagesPage);
   }
   conatctus(){
   this.navCtrl.push(ContactPage);
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
    localStorage.removeItem('wid');
    this.app.getRootNav().setRoot(StartPage);
   }


}
