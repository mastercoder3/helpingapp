import { Component, OnInit } from '@angular/core';
import { NavController } from 'ionic-angular';

import {SigninPage} from '../signin/signin';

@Component({
  selector: 'page-start',
  templateUrl: 'start.html'
})
export class StartPage {

  constructor(private navCtrl: NavController){
    if(localStorage.getItem('uid')){
      this.navCtrl.push(SigninPage);

    }
   }

  customer(){
    this.navCtrl.push(SigninPage);
  }

}
