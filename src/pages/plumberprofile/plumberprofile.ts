import { Component, OnInit } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {map} from 'rxjs/operators';

 import { BooknowPage } from '../booknow/booknow';
 import { ChatscreenPage } from '../chatscreen/chatscreen';
import { ApiProvider } from '../../providers/api/api';
@Component({
  selector: 'page-plumberprofile',
  templateUrl: 'plumberprofile.html'
})
export class PlumberprofilePage {
plumber: string = "about";
worker;
  constructor(public navCtrl: NavController, private navParams: NavParams, private api: ApiProvider) {

  } 

  ngOnInit(){
    let id = this.navParams.get('id');
    this.getData(id);
  }

  getData(id){
    this.api.getWorkerProfile(id)
      .pipe(map(actions => {
        const data = actions.payload.data();
        const did = actions.payload.id;
        return {did, ...data};
      }))

      .subscribe(res => {
        this.worker = res;
      })
  }

    booknow(){
    this.navCtrl.push(BooknowPage, {
      workerId: this.worker.did 
    });
    }
    chatscreen(){
    this.navCtrl.push(ChatscreenPage);
    }


}
