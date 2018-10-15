import { Component, OnInit } from '@angular/core';
import { NavController } from 'ionic-angular';
import {map} from 'rxjs/operators';
import { ApiProvider } from '../../../providers/api/api';
import { HelperProvider } from '../../../providers/helper/helper';

 //import { ListofplumberPage } from '../listofplumber/listofplumber';
@Component({
  selector: 'page-allreview',
  templateUrl: 'allreview.html'
})
export class AllreviewPage implements OnInit {

  review;
  constructor(public navCtrl: NavController, private api: ApiProvider, private helper: HelperProvider) {

  }

  ngOnInit(){
    this.helper.presentLoadingDefault();
    this.getData(localStorage.getItem('wid'));
  }

  getData(id){
    this.api.getReview(id)
      .pipe(map(actions => actions.map(a => {
        const data = a.payload.doc.data();
        const did = a.payload.doc.id;
        return {did, ...data};
      })))
      .subscribe(res => {
        this.review = res;
        this.helper.closeLoading();
      })
  }

}
