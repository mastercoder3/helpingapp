import { Component, OnInit } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {ApiProvider} from '../../../providers/api/api';
import {map} from 'rxjs/operators';
 //import { ListofplumberPage } from '../listofplumber/listofplumber';
@Component({
  selector: 'page-booking',
  templateUrl: 'booking.html'
})
export class BookingPage implements OnInit{

  post;
  constructor(public navCtrl: NavController, private navParams: NavParams, private api: ApiProvider) {

  }

  ngOnInit(){
    let id = this.navParams.get('id');
    this.getPost(id);
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

  accept(){
    let id = this.post.did;
    delete this.post['did'];
    this.post.postStatus = 'accepted';

    this.api.updatePost(id, this.post)
      .then(res => {
        console.log('job accepted');
      }, err => {
        console.log(err.message);
      })
  }

  start(){
    let date = new Date();
    this.post.startTime = date;
    let id = this.post.did;
    delete this.post['did'];
    this.post.postStatus = 'inprocess';
    
    this.api.updatePost(id, this.post)
    .then(res => {
      console.log('job started');
    }, err => {
      console.log(err.message);
    }) 
  
  }

  stop(){
    let date = new Date();
    this.post.endTime = date;
    let id = this.post.did;
    delete this.post['did'];
    this.post.postStatus = 'completed';
    
    this.api.updatePost(id, this.post)
    .then(res => {
      let stime = this.post.startTime.toDate();
      let time = new Date(stime).getTime();
      let total = ((date.getTime() - time)/1000);
      let calculated = new Date(total * 1000).toISOString().substr(11, 8);
      console.log(calculated);
    }, err => {
      console.log(err.message);
    }) 
  }
  
//listofplumber(){
   //this.navCtrl.push(ListofplumberPage);
   //}


}
