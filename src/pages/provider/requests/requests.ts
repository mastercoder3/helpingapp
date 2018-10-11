import { Component, OnInit } from '@angular/core';
import { NavController } from 'ionic-angular';
import {map} from 'rxjs/operators';

import { BookingPage } from '../booking/booking';
import { ApiProvider } from '../../../providers/api/api';
@Component({
  selector: 'page-requests',
  templateUrl: 'requests.html'
})
export class RequestsPage implements OnInit{
requests: string = "upcoming";

  newPosts;
  acceptedPosts;
  completedPosts;
  constructor(public navCtrl: NavController, private api: ApiProvider) {

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
        console.log(res);
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
      });
  }


  
 booking(item){
   console.log(item);
   this.navCtrl.push(BookingPage, {
     id: item.did
   });
  }


}
