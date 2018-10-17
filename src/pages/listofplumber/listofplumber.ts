import { Component , OnInit} from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {map} from 'rxjs/operators';

 import { PlumberprofilePage } from '../plumberprofile/plumberprofile';
import { ApiProvider } from '../../providers/api/api';
import { HelperProvider } from '../../providers/helper/helper';
import * as haversine from 'haversine';
@Component({
  selector: 'page-listofplumber',
  templateUrl: 'listofplumber.html'
})
export class ListofplumberPage {
 gaming: string = "nes";

 subCatName;
 workers;
 user;
 customer;
 lat;
 lng;
 userDistance;
 workerDistance;
  constructor(public navCtrl: NavController, private navParams: NavParams, private api: ApiProvider, private helper: HelperProvider) {
    this.api.getUserData(localStorage.getItem('uid'))
      .pipe(map(actions => {
        const data = actions.payload.data();
        const did = actions.payload.id;
        return {did, ...data};
      }))
      .subscribe(dataResponse => {
        this.customer = dataResponse
        this.lat = this.customer.lat;
        this.lng = this.customer.lng;
        this.helper.presentLoadingDefault();
        this.userDistance = {
          latitude: this.lat,
          longitude: this.lng
        };
        this.subCatName = this.navParams.get('name');
        let id = this.navParams.get('id');
        if(this.lat && this.lng)
          this.getData(id);
      });
  } 

  ngOnInit(){
  }

  getData(id){
    if(localStorage.getItem('city') !== 'all'){
      this.api.getWorkers(id,localStorage.getItem('city'))
      .pipe(map(actions => actions.map(a => {
        const data = a.payload.doc.data();
        const did = a.payload.doc.id;
        const distance = 0;
        return {did, distance, ...data};
      })))
      .subscribe(res => {
        this.user = res;
        this.workers = this.user.filter(data=> data.status === true);
        this.helper.closeLoading();
        this.workerDistance = {
          latitude: this.user.lat,
          longitude: this.user.lng
        };
        this.user.distance = haversine(this.userDistance, this.workerDistance);
      })
    }
    else if(localStorage.getItem('city') === 'all'){
      this.api.getAllWorkers(id)
      .pipe(map(actions => actions.map(a => {
        const data = a.payload.doc.data();
        const did = a.payload.doc.id;
        const distance =0
        return {did, distance, ...data};
      })))
      .subscribe(res => {
        this.user = res;
        this.workers = this.user.filter(data=> data.status === true);
        this.helper.closeLoading()
      })
    }

      
  }

 plumberprofile(item){
   let id = item.did;
    this.navCtrl.push(PlumberprofilePage, {
      id: id,
      distance: item.distance
    });
  }


}
