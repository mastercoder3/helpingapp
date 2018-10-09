import { Component, OnInit } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {map} from 'rxjs/operators';

import { ApiProvider } from '../../providers/api/api';

@Component({
  selector: 'page-booking',
  templateUrl: 'booking.html'
})
export class BookingPage {

  postId;
  post;
  constructor(public navCtrl: NavController, private navParams: NavParams, private api: ApiProvider) {
  }
  
  ngOnInit(){
    this.postId = this.navParams.get('postId');
    this.getPost(this.postId);
  }

  getPost(id){
    this.api.getBooking(id)
      .pipe(map(actions => {
          const data = actions.payload.data();
          const did = actions.payload.id;
          return {did, ...data};
      }))
      .subscribe(res => {
        this.post = res;
      })
  }

}
