import { Component, OnInit } from '@angular/core';
import { NavController } from 'ionic-angular';
import { map} from 'rxjs/operators';

import { CategoryPage } from '../category/category';
import { ApiProvider } from '../../providers/api/api';
import {PostPage} from '../post/post';
import { AutocompleteProvider } from '../../providers/autocomplete/autocomplete';
import { HelperProvider } from '../../providers/helper/helper';
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage implements OnInit {

  user;
  city: string = "";
  categories;
  image: string = './../../../assets/imgs/ic_beauty.png"';

  constructor(public navCtrl: NavController,
    private api: ApiProvider,
    private autoComplete: AutocompleteProvider,
    private helper: HelperProvider
    ) {

  } 

  ngOnInit(){
    this.helper.presentLoadingDefault();
    this.getData(localStorage.getItem('uid'));
  }

  getResult(keywords: string){
    console.log(keywords)
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
        
      });

      this.api.getUserCity(id)
        .pipe(map(a => {
          const data = a.payload.data();
          return {data};
        }))
        .subscribe(res => {
          this.user = res;
          this.city = this.user.data.city;
          localStorage.setItem('city',this.city.toLocaleLowerCase());
          this.helper.closeLoading();
        })


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




}
