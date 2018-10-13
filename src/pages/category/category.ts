import { Component, OnInit } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {map} from 'rxjs/operators';

 import { ListofplumberPage } from '../listofplumber/listofplumber';
import { ApiProvider } from '../../providers/api/api';
@Component({
  selector: 'page-category',
  templateUrl: 'category.html'
})
export class CategoryPage {

  id;
  imageURL;
  image: string = './../../../assets/imgs/plaumbing-logo.png';
  subCategory;

  constructor(public navCtrl: NavController,
    private navParams: NavParams,
    private api: ApiProvider
    ) {

  } 

  ngOnInit(){
    this.id = this.navParams.get('id');
    this.imageURL = this.navParams.get('imageURL');
    this.getData(this.id);
  }
  
  getData(id){
    this.api.getSubCategorie(id)
      .pipe(map(actions => actions.map( a => {
        const data = a.payload.doc.data();
        const did = a.payload.doc.id;
        return {did, ...data};
      })))

      .subscribe(res => {
        this.subCategory = res;
        console.log(this.subCategory);
      })
  }

  findWorkers(item){
    this.navCtrl.push(ListofplumberPage,{
      id: item.categoryId,
      name: item.name,
      CategoryType: item.categoryName
    });
  }


}
