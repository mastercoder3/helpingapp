import { Component, OnInit } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { HelperProvider } from '../../providers/helper/helper';
import { ApiProvider } from '../../providers/api/api';
import {map} from 'rxjs/operators';


@Component({
  selector: 'page-manageaddress',
  templateUrl: 'manageaddress.html'
})
export class ManageaddressPage implements OnInit{
  

  address;
  city;
  phone;
  user;

  constructor(public navCtrl: NavController, private navParams: NavParams, private helper: HelperProvider, private api: ApiProvider) { } 

  ngOnInit(){
    this.address = this.navParams.get('address');
    this.city = this.navParams.get('city');
    this.phone = this.navParams.get('phone');
    this.getData(localStorage.getItem('uid'));
  }

  getData(id){
    this.api.getUserData(id)
    .pipe(map(actions => {
      const data = actions.payload.data();
      const did = actions.payload.id;
      return {did, ...data};
    }))
    .subscribe(res => {
      this.user = res;

    })
  }

  edit(){
    let myfunc = (res) => {
        this.user.address = (res.address != '') ? res.address : this.user.address;
        this.user.city = (res.city != '' ) ? res.city : this.user.city;
        this.user.phone = (res.phone != '') ? res.phone : this.user.phone;

        this.api.updateUser(localStorage.getItem('uid'),this.user)
          .then(Response => {
            console.log('Record Updated');
          }, err => {
            console.log(err.message);
          })
    };
    this.helper.showPrompt('Edit', 'Edit your Address', 'address',this.user.address, 'city', this.user.city,'phone', this.user.phone,myfunc);
  }


}
