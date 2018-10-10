import { Component, OnInit } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {map} from 'rxjs/operators';

import { ApiProvider } from '../../providers/api/api';
import { PlumberprofilePage } from '../plumberprofile/plumberprofile';
import { HelperProvider } from '../../providers/helper/helper';

@Component({
  selector: 'page-booking',
  templateUrl: 'booking.html'
})
export class BookingPage {

  rate: number = 0;

  postId;
  post;
  revieww;
  user;
  constructor(public navCtrl: NavController, private navParams: NavParams, private api: ApiProvider,private helper: HelperProvider) {
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

  profile(){
    this.navCtrl.push(PlumberprofilePage, {
      id: this.post.workerId
    })
  }

  update(){
    let id = this.post.did;
    delete this.post['did'];
    this.api.updatePost(id,this.post);
  }

  review(){
    if(this.revieww != '' && this.rate != 0){
      this.api.getUserData(localStorage.getItem('uid'))
        .pipe(map(actions => {
          const data = actions.payload.data();
          const did = actions.payload.id;
          return {did, ...data};
        }))
        .subscribe(res => {
          this.user = res;
          let data = {customerId: localStorage.getItem('uid'), cutomerName: this.user.name,
           imageURL: this.user.imageURL, workerId: this.post.workerId, rating: this.rate, review: this.revieww};
          this.api.createReview(data)
            .then(response => {
              this.post.review = true;
              this.update();
              console.log('review added');
            }, err => {
              console.log(err);
            })
        })

    }
  }

}
