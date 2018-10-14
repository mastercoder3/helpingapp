import { Component, OnInit } from '@angular/core';
import { NavController } from 'ionic-angular';
import {map} from 'rxjs/operators';
 import { SelectservicePage } from '../selectservice/selectservice';
import { ApiProvider } from '../../../providers/api/api';
@Component({
  selector: 'page-myprofile',
  templateUrl: 'myprofile.html'
})
export class MyprofilePage implements OnInit{
 gaming: string = "nes";

 worker;

  constructor(public navCtrl: NavController, private api: ApiProvider) {

  }

  ngOnInit(){
    this.getData(localStorage.getItem('wid'));
  }

  getData(id){
    this.api.getWorkerProfile(id)
      .pipe(map(actions => {
        const data = actions.payload.data();
        const did = actions.payload.id;
        return {did, ...data};
      }))

      .subscribe(res =>{
        this.worker = res;
      })
  }

  update(){
    this.worker.city.toLowerCase( );
    this.api.updateWorker(localStorage.getItem('wid'), this.worker)
      .then(res => {
        console.log('worker profile updated');
      }, err => {
        console.log(err.message);
      })
  }

  
  
selectservice(){
   this.navCtrl.push(SelectservicePage);
   }


}
