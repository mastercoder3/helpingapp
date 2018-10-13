import { Component } from '@angular/core';
import { NavParams, NavController } from 'ionic-angular';
import { HelperProvider } from '../../../providers/helper/helper';
@Component({
  selector: 'page-modalPage',
  templateUrl: 'modalPage.html'
})
export class ModalPage {

  image;

  constructor(private navParams: NavParams, private navCtrl: NavController) {
    this.image = this.navParams.get('image');
  }

  close(){
    this.navCtrl.pop();
  }

}
