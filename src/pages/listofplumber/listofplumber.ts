import { Component , OnInit} from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {map} from 'rxjs/operators';

 import { PlumberprofilePage } from '../plumberprofile/plumberprofile';
import { ApiProvider } from '../../providers/api/api';
@Component({
  selector: 'page-listofplumber',
  templateUrl: 'listofplumber.html'
})
export class ListofplumberPage {
 gaming: string = "nes";

 subCatName;
 workers;
 user;
  constructor(public navCtrl: NavController, private navParams: NavParams, private api: ApiProvider) {

  } 

  ngOnInit(){
    this.subCatName = this.navParams.get('name');
    let id = this.navParams.get('id');
    this.getData(id);
  }

  getData(id){
    console.log(id)
    this.api.getWorkers(id,localStorage.getItem('city'))
      .pipe(map(actions => actions.map(a => {
        const data = a.payload.doc.data();
        const did = a.payload.doc.id;
        return {did, ...data};
      })))
      .subscribe(res => {
        this.user = res;
        this.workers = this.user.filter(data=> data.status === 'online');
        console.log(this.workers);
      })
      
  }

 plumberprofile(item){
   let id = item.did;
    this.navCtrl.push(PlumberprofilePage, {
      id: id
    });
  console.log(item);
    }


}
