import { Injectable } from '@angular/core';
import { ApiProvider } from '../api/api';

/*
  Generated class for the ChatProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ChatProvider {

  constructor(private api: ApiProvider) { }
  

}
