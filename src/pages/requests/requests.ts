import { Component, OnInit } from '@angular/core';
import { NavController } from 'ionic-angular';
import {map} from 'rxjs/operators';

 import { BookingPage } from '../booking/booking';
import { ApiProvider } from '../../providers/api/api';
@Component({
  selector: 'page-requests',
  templateUrl: 'requests.html'
})
export class RequestsPage implements OnInit{
  requests: string = "pending";
  posts;
  constructor(public navCtrl: NavController, private api: ApiProvider) {

  } 

  ngOnInit(){
    this.getdata(localStorage.getItem('uid'));
  }

  getdata(id){
    this.api.getPosts(id)
      .pipe(map(actions => actions.map(a => {
        const data = a.payload.doc.data();
        const did = a.payload.doc.id;
        return {did, ...data};
      })))

      .subscribe(res => {
        this.posts = res;
      })
  }

 booking(item){
    this.navCtrl.push(BookingPage, {
      postId: item.did
    });
    }

}
