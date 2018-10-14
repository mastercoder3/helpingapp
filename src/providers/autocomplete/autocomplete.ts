import { Injectable } from '@angular/core';
import {AutoCompleteService} from 'ionic2-auto-complete';
import {map} from 'rxjs/operators';
import { ApiProvider } from '../api/api';

/*
  Generated class for the AutocompleteProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class AutocompleteProvider implements AutoCompleteService{

  cat;
  category;

  constructor(private api: ApiProvider) {
    this.category =  this.api.getCategories()
    .pipe(map(actions => actions.map(
      result =>
      {
       return result.payload.doc.data();
      }
    )));
  }

  getResults(keyword:string) {
    // return this.category
    // .subscribe(res => {
    //   this.cat = res;
    //    this.cat
    //   .filter(item =>  
    //      'yes'
    //    )
    // });
  }

}
