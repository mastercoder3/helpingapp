import { Component, OnInit } from '@angular/core';
import { NavController } from 'ionic-angular';
import {map} from 'rxjs/operators';

import { CategoryPage } from '../category/category';
import { ApiProvider } from '../../providers/api/api';
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  city: string = "Mumbai";
  categories;
  image: string = './../../../assets/imgs/ic_beauty.png"';

  constructor(public navCtrl: NavController,
    private api: ApiProvider
    ) {

  } 

  ngOnInit(){
    this.getData();
  }

  getData(){
    this.api.getCategories()
      .pipe(map(actions => actions.map(a => {
        const data = a.payload.doc.data();
        const did = a.payload.doc.id;
        return {did, ...data};
      })))

      .subscribe(res => {
        this.categories = res;
      })
  }

  selectedCategory(item){
    this.navCtrl.push(CategoryPage, {
      id: item.did,
      imageURL: item.imageURL
    });
  }

  category(){
     
   }


}
