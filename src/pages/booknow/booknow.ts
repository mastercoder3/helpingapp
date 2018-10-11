import { Component, OnInit } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { ApiProvider } from '../../providers/api/api';
import {map} from 'rxjs/operators';

@Component({
  selector: 'page-booknow',
  templateUrl: 'booknow.html'
})
export class BooknowPage {

  date;
  time;
  address;
  city;
  wrokerId;
  user;
  workerName;
  service;
  category;
  customer;
  constructor(public navCtrl: NavController, private api: ApiProvider, private navParams: NavParams) {

  } 

  ngOnInit(){
    this.wrokerId = this.navParams.get('workerId');
    this.workerName = this.navParams.get('workerName');
    this.service = this.navParams.get('service');
    this.category = this.navParams.get('category');
    this.getData(this.wrokerId);
  }

  getData(id){
    this.api.getWorkerProfile(id)
      .pipe(map(actions => {
        const data = actions.payload.data();
        const did = actions.payload.id;
        return {did, ...data};
      }))
      .subscribe(res => {
        this.user = res;
      });

      this.api.getUserData(localStorage.getItem('uid'))
        .pipe(map(actions => {
          const data = actions.payload.data();
          const did = actions
          return {did, ...data};
        }))
        .subscribe(res => {
          this.customer = res;
        })
  }

  book(){

    if(this.date != undefined && this.time != undefined && this.address != '' && this.city != ''){
      let data = {date: this.date, time: this.time, address: this.address, city: this.city, customerId: localStorage.getItem('uid'), status: 'inactive', 
      workerId: this.wrokerId, workerName: this.workerName, service: this.service, category: this.category, postStatus: 'inactive', imageURL: this.customer.imageURL,
      rate: this.user.rate, review: false, jobTitle: this.user.jobTitle
    };
      this.api.createPost(data)
        .then(res => {
          console.log('order placed');
          this.navCtrl.popTo(this.navCtrl.getByIndex(this.navCtrl.length()-6));
        }, err => {
          console.log(err.message);
        })
    }
  }
}
