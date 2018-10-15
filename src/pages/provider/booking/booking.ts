import { Component, OnInit } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {ApiProvider} from '../../../providers/api/api';
import {map} from 'rxjs/operators';
import { HelperProvider } from '../../../providers/helper/helper';
 //import { ListofplumberPage } from '../listofplumber/listofplumber';
@Component({
  selector: 'page-booking',
  templateUrl: 'booking.html'
})
export class BookingPage implements OnInit{

  post;
  constructor(public navCtrl: NavController, private navParams: NavParams, private api: ApiProvider, private helper: HelperProvider) {

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
        console.log(this.post.date);
        console.log(new Date(this.post.date).toDateString())
        console.log(new Date(this.post.time))
        if(new Date().toDateString() >= new Date(this.post.date).toDateString()){
          console.log('yes')
        }
      })
  }

  accept(){
    let id = this.post.did;
    delete this.post['did'];
    this.post.postStatus = 'accepted';

    this.api.updatePost(id, this.post)
      .then(res => {
        this.helper.presentToast('Job Accepted.');
        this.api.checkChatIfExistsWorker(localStorage.getItem('wid'),this.post.customerId)
          .pipe(map(actions => actions.map(a =>{
            const data = a.payload.doc.data();
            return {data};
          })))
          .subscribe(res => {
            if(res.length === 0){
              let data = {};
              this.api.createChat(data);
            }
          })
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
      this.helper.presentToast('Job Time has been Started');
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
    this.post.status = 'completed';
    
    this.api.updatePost(id, this.post)
    .then(res => {
      let stime = this.post.startTime.toDate();
      let time = new Date(stime).getTime();
      let total = ((date.getTime() - time)/1000);
      let calculated = new Date(total * 1000).toISOString().substr(11, 8);
      let myfunc = (res) => {
        // do nothing
      };
      this.helper.showAlertWithoutInput('Job Ended!','The Job has been Ended, Total Time is:' + calculated, 'Okay' ,myfunc)
    }, err => {
      console.log(err.message);
    }) 
  }
  
//listofplumber(){
   //this.navCtrl.push(ListofplumberPage);
   //}


}
