import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

 import { PurchaseplanPage } from '../purchaseplan/purchaseplan';
 import { ConatctusPage } from '../conatctus/conatctus';

@Component({
  selector: 'page-packages',
  templateUrl: 'packages.html'
})
export class PackagesPage { 
  constructor(public navCtrl: NavController) {

  }
  
purchaseplan(){
   this.navCtrl.push(PurchaseplanPage);
   }
conatctus(){
   this.navCtrl.push(ConatctusPage);
   }
}
