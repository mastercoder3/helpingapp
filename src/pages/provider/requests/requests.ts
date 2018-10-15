import { Component, OnInit } from '@angular/core';
import { NavController } from 'ionic-angular';
import {map} from 'rxjs/operators';

import { BookingPage } from '../booking/booking';
import { ApiProvider } from '../../../providers/api/api';
import { HelperProvider } from '../../../providers/helper/helper';
@Component({
  selector: 'page-requests',
  templateUrl: 'requests.html'
})
export class RequestsPage implements OnInit{
requests: string = "upcoming";

  newPosts;
  acceptedPosts;
  completedPosts;
  constructor(public navCtrl: NavController, private api: ApiProvider, private helper: HelperProvider) {
    this.helper.presentLoadingDefault();
  }

  ngOnInit(){
    this.getData(localStorage.getItem('wid'));
  }

  getData(id){
    this.api.getNewPosts(id)
      .pipe(map(actions => actions.map(a => {
        const data = a.payload.doc.data();
        const did = a.payload.doc.id;
        return {did, ...data};
      })))

      .subscribe(res =>{
        this.newPosts = res;
      });

      this.api.getCurrentPosts(id)
      .pipe(map(actions => actions.map(a => {
        const data = a.payload.doc.data();
        const did = a.payload.doc.id;
        return {did, ...data};
      })))

      .subscribe(res =>{
        this.acceptedPosts = res;
      });

      this.api.getCompletedPosts2(id)
      .pipe(map(actions => actions.map(a => {
        const data = a.payload.doc.data();
        const did = a.payload.doc.id;
        return {did, ...data};
      })))

      .subscribe(res => {
        this.completedPosts = res;
        this.helper.closeLoading();
      });
  }


  
 booking(item){
   console.log(item);
   this.navCtrl.push(BookingPage, {
     id: item.did
   });
  }


}
