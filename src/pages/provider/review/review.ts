import { Component, OnInit } from '@angular/core';
import { NavController } from 'ionic-angular';

 import { AllreviewPage } from '../allreview/allreview';
import { ApiProvider } from '../../../providers/api/api';
import {map} from 'rxjs/operators';
import { HelperProvider } from '../../../providers/helper/helper';
@Component({
  selector: 'page-review',
  templateUrl: 'review.html'
})
export class ReviewPage implements OnInit {

  review;
  total: number = 0;
  length: number = 0;
  oneStar: number = 0;
  twoStar: number = 0;
  threeStar: number = 0;
  fourStar: number = 0;
  fiveStar: number = 0;
  fPercent: number = 0;
  user;

  constructor(public navCtrl: NavController, private api: ApiProvider, private helper: HelperProvider) {

  }

  ngOnInit(){
    this.getData(localStorage.getItem('wid'));
  }

  getData(id){
    this.api.getReview(id)
      .pipe(map(actions => actions.map(a=>{
        const data = a.payload.doc.data();
        const did = a.payload.doc.id;
        return {did, ...data};
      })))
      .subscribe(res => {
        this.total = 0;
        this.oneStar = this.twoStar = this.threeStar = this.fourStar = this.fiveStar = 0;
        this.review = res;
        this.length = Object.keys(this.review).length;
        this.review.forEach(a => {
          this.total = this.total + a.rating;
          if(a.rating == 1)
            this.oneStar++;
          else if(a.rating == 2)
            this.twoStar++;
          else if(a.rating == 3)
            this.threeStar++;
          else if(a.rating == 4)
            this.fourStar++;
          else if(a.rating == 5)
            this.fiveStar++;
        });
      this.fPercent = (this.fiveStar/this.length)*100;
      });

      this.api.getWorkerProfile(id)
      .pipe(map(actions => {
        const data = actions.payload.data();
        return {data};
      }))
      .subscribe(res => {
        this.user = res;
        if(this.user)
          this.getLocation(id);
      });
  }
  
allreview(){
   this.navCtrl.push(AllreviewPage);
   }

   getLocation(id){
    this.helper.getLocation()
      .then(resp => {
        this.user.lat = resp.coords.latitude;
        this.user.lng = resp.coords.longitude;
          this.api.updateWorkerLocation(id,{lat: this.user.lat, lng: this.user.lng});
      }, err => {
        this.helper.presentToast('Error while getting your location.');
      });
  }


}
