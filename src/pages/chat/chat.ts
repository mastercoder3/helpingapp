import { Component, OnInit } from '@angular/core';
import { NavController } from 'ionic-angular';
import {map} from 'rxjs/operators';

 import { ChatscreenPage } from '../chatscreen/chatscreen';
import { ApiProvider } from '../../providers/api/api';
@Component({
  selector: 'page-chat',
  templateUrl: 'chat.html'
})
export class ChatPage implements OnInit{

  chats;
  length=[];
  constructor(public navCtrl: NavController, private api: ApiProvider) {

  } 
  chatscreen(item){
    this.navCtrl.push(ChatscreenPage,{
      workerId: item.receiverId,
      name: item.receiverName,
      image: item.receiverImage
    });
    }

  ngOnInit(){ 
    this.getData(localStorage.getItem('uid'));
  }

  getData(id){
    this.api.getSenderChats(id)
      .pipe(map(actions => actions.map(a => {
        const data = a.payload.doc.data();
        const did = a.payload.doc.id;
        return {did, ...data};
      })))
      .subscribe(res => {
        this.chats = res;
        let x = 0;
        this.chats.forEach(a => {
          this.length[x] = a.messages.length - 1 ;
          x++;
        });
        console.log(this.length);
      })
  }


}
