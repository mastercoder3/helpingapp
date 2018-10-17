import { Component, OnInit } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {map} from 'rxjs/operators';

import { ApiProvider } from '../../providers/api/api';
import { PlumberprofilePage } from '../plumberprofile/plumberprofile';
import { HelperProvider } from '../../providers/helper/helper';
import * as haversine from 'haversine';

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
  customer;
  worker;
  userDistance;
  workerDistance;

  constructor(public navCtrl: NavController, private navParams: NavParams, private api: ApiProvider,private helper: HelperProvider) {
    this.api.getUserData(localStorage.getItem('uid'))
      .pipe(map(actions => {
        const data = actions.payload.data();
        const did = actions.payload.id;
        return {did, ...data};
      }))
      .subscribe(res => {
        this.customer = res;
        let lat = this.customer.lat;
        let lng = this.customer.lng;
        this.userDistance = {
          latitude: lat,
          longitude: lng
        };
      });
    
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
        if(this.post.workerId)
          this.getWorkerProfile(this.post.workerId);
      })
  }

  getWorkerProfile(id){
    this.api.getWorkerProfile(this.post.workerId)
      .pipe(map(actions => {
        const data = actions.payload.data;
        return {data};
      }))
      .subscribe(res => {
        this.worker = res;
        let lat = this.worker.lat;
        let lng = this.worker.lng;
        this.workerDistance ={
          latitude: lat,
          longitude: lng
        }
      })
  }

  profile(){
    let distance = haversine(this.userDistance, this.workerDistance);
    this.navCtrl.push(PlumberprofilePage, {
      id: this.post.workerId,
      distance: distance
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
