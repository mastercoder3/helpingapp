import { Component, OnInit } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {map} from 'rxjs/operators';

import { ApiProvider } from '../../../providers/api/api';
import { HelperProvider } from '../../../providers/helper/helper';
@Component({
  selector: 'page-jobinformation',
  templateUrl: 'jobinformation.html'
})
export class JobInformationPage implements OnInit{

  post;
  worker;
  constructor(public navCtrl: NavController, private api: ApiProvider, private navParams: NavParams, private helper: HelperProvider) {

  }

  ngOnInit(){
    let id = this.navParams.get('id');
    console.log(id)
    this.getData(id);
  }

  getData(id){
    this.api.getNewPostById(id)
    .pipe(map(actions => {
      const data = actions.payload.data();
      const did = actions.payload.id;
      return {did, ...data};
    }))
    .subscribe(res => {
      this.post = res;
      console.log(res)
    });

    this.api.getWorkerProfile(localStorage.getItem('wid'))
    .pipe(map(actions => {
      const data = actions.payload.data();
      const did = actions.payload.id;
      return {did, ...data};
    }))
    .subscribe(res => {
      this.worker = res;      

    })
  }

  viewImage(){
    this.helper.presentImageModal(this.post.postImage);
  }

  accept(){
    let data = {address: this.post.address, city: this.post.city, customerId: this.post.customerId, date: this.post.date,
    postStatus: 'accepted', review: false, status: this.post.status, time: this.post.time, workerId: localStorage.getItem('wid'),
    workerName: this.worker.firstName, imageURL: this.post.customerImage, service: this.post.serviceType, jobTitle: this.post.category, rate: this.worker.rate
    };
    console.log(data);

    this.api.createPost(data)
      .then(res => {
        this.navCtrl.pop();
        this.api.deletePost(this.post.did)
        .then(Response => {            
            this.helper.presentToast('Job Accepted and Added to your List.');            
        }, err =>{
          
        });
      }, err => {
        this.helper.presentToast('Error While Accepting the Job');
      });
  }


}
