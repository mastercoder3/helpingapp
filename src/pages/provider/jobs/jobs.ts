import { Component, OnInit } from '@angular/core';
import { NavController } from 'ionic-angular';
import {map} from 'rxjs/operators';

import { BookingPage } from '../booking/booking';
import { ApiProvider } from '../../../providers/api/api';
@Component({
  selector: 'page-jobs',
  templateUrl: 'jobs.html'
})
export class JobsPage implements OnInit{
requests: string = "upcoming";

  newPosts;
  acceptedPosts;
  completedPosts;
  constructor(public navCtrl: NavController, private api: ApiProvider) {

  }

  ngOnInit(){
    this.getData();
  }

  getData(){
    this.api.getNewPostsRequests()
      .pipe(map(actions => actions.map(a => {
        const data = a.payload.doc.data();
        const did = a.payload.doc.id;
        return {did, ...data};
      })))

      .subscribe(res =>{
        this.newPosts = res;
      });

  }


  
 JobDetails(item){
   console.log(item);
  //  this.navCtrl.push(BookingPage, {
  //    id: item.did
  //  });
  }


}
