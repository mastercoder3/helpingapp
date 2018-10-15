import { Component, OnInit } from '@angular/core';
import { NavController } from 'ionic-angular';
import {map} from 'rxjs/operators';

 import { BookingPage } from '../booking/booking';
import { ApiProvider } from '../../providers/api/api';
import { HelperProvider } from '../../providers/helper/helper';
@Component({
  selector: 'page-requests',
  templateUrl: 'requests.html'
})
export class RequestsPage implements OnInit{
  requests: string = "pending";
  posts;
  completedPosts;
  constructor(public navCtrl: NavController, private api: ApiProvider, private helper: HelperProvider) {

  } 

  ngOnInit(){
    this.helper.presentLoadingDefault();
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
      });

      this.api.getCompletedPosts(id)
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
    this.navCtrl.push(BookingPage, {
      postId: item.did
    });
    }

}
