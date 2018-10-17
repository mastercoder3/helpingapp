import { Component, OnInit } from '@angular/core';
import { NavController } from 'ionic-angular';
import { map} from 'rxjs/operators';

import { CategoryPage } from '../category/category';
import { ApiProvider } from '../../providers/api/api';
import {PostPage} from '../post/post';
import { HelperProvider } from '../../providers/helper/helper';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage implements OnInit {

  user;
  city = {
    city: 'city',
    all: 'all'
  };
  categories;
  searchCat;
  image: string = './../../../assets/imgs/ic_beauty.png"';
  searchTerm:string ='';
  selectedCity;
  lat;
  lng;
  position;

  constructor(public navCtrl: NavController,
    private api: ApiProvider,
    private helper: HelperProvider
    ) {

  } 

  ngOnInit(){
    this.helper.presentLoadingDefault();
    this.getData(localStorage.getItem('uid'));
  }

  getData(id){
    this.api.getCategories()
      .pipe(map(actions => actions.map(a => {
        const data = a.payload.doc.data();
        const did = a.payload.doc.id;
        return {did, ...data};
      })))

      .subscribe(res => {
        this.categories = res;
        this.getCat();
      });

      this.api.getUserCity(id)
        .pipe(map(a => {
          const data = a.payload.data();
          return {data};
        }))
        .subscribe(res => {
          this.user = res;
          this.city.city = this.user.data.city;
          let to  = this.city.city;
          to = to.toLowerCase()
          this.city.city = to;
          this.selectedCity = this.city.city;
          localStorage.setItem('city',this.selectedCity);
          this.helper.closeLoading();
          this.getLocation(id);
        });



  }


  getCat(){
   this.searchCat = this.categories;
  }

  getLocation(id){
    this.helper.getLocation()
      .then(res => {
        this.user.lat = res.coords.latitude;
        this.user.lng = res.coords.longitude;
        this.api.updateUserLocation(id,{lat: this.user.lat, lng: this.user.lng});
      }, err => {
        this.helper.presentToast('Error while getting your location.');
      });
  }

  selectedCategory(item){
    this.navCtrl.push(CategoryPage, {
      id: item.did,
      imageURL: item.imageURL
    });
  }


   newPost(){ 
     this.navCtrl.push(PostPage)
   }

   getItems(ev: any) {

    const val = ev.target.value;

    // set val to the value of the searchbar

    // if the value is an empty string don't filter the items
    if (val && val.trim() != '') {
      this.searchCat = this.searchCat.filter((item) => {
        return (item.name.toLowerCase().indexOf(val.toLowerCase()) > -1);
      })
    }
    else{
      this.getCat();
    }
  }

  setCity(event){
    this.selectedCity = event;
    localStorage.setItem('city',this.selectedCity);
  }




}
