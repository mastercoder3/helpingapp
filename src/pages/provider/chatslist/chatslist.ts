import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { ChatscreenPage } from '../chatscreen/chatscreen';
@Component({
  selector: 'page-chatslist',
  templateUrl: 'chatslist.html'
})
export class ChatslistPage {

  constructor(public navCtrl: NavController) {

  }
  
chatscreen(){
  this.navCtrl.push(ChatscreenPage);
  }


}
