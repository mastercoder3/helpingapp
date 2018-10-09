import { Component, OnInit } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { ApiProvider } from '../../providers/api/api';

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
  constructor(public navCtrl: NavController, private api: ApiProvider, private navParams: NavParams) {

  } 

  ngOnInit(){
    this.wrokerId = this.navParams.get('workerId');
  }

  book(){
    if(this.date != undefined && this.time != undefined && this.address != '' && this.city != ''){
      let data = {date: this.date, time: this.time, address: this.address, city: this.city, customerId: localStorage.getItem('uid'), status: 'inactive', wokerId: this.wrokerId};
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
