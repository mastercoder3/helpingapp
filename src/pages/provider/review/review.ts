import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

 import { AllreviewPage } from '../allreview/allreview';
@Component({
  selector: 'page-review',
  templateUrl: 'review.html'
})
export class ReviewPage {

  constructor(public navCtrl: NavController) {

  }
  
allreview(){
   this.navCtrl.push(AllreviewPage);
   }


}
