import { Component, OnInit } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { ApiProvider } from '../../../providers/api/api';
import {map} from 'rxjs/operators';

 //import { ListofplumberPage } from '../listofplumber/listofplumber';
@Component({
  selector: 'page-chatscreen',
  templateUrl: 'chatscreen.html'
})
export class ChatscreenPage implements OnInit{

  senderId;
  senderName;
  image;
  chat;
  userId;
  msgList;
  newMsg;
  chatId;
  worker;

  constructor(public navCtrl: NavController, private navParams: NavParams, private api: ApiProvider) {
    this.senderId = this.navParams.get('senderId');
    this.senderName = this.navParams.get('name');
    this.image = this.navParams.get('image');
    this.userId = localStorage.getItem('wid');
  }

  ngOnInit(){
    this.getData(this.userId);
    this.checkPreviousMessages(this.senderId);
  }

  getData(id){
    this.api.getWorkerProfile(id)
      .pipe(map(actions => {
        const data = actions.payload.data();
        const did = actions.payload.id;
        return {did, ...data};
      }))
      .subscribe(res => {
        this.worker = res;
      })
  }

  checkPreviousMessages(id){
    this.api.checkChatIfExistsWorker(this.userId,id)
      .pipe(map(actions => actions.map(a => {
        const data = a.payload.doc.data();
        const did = a.payload.doc.id;
        return {did, ...data};
      })))
      .subscribe(res => {

        if(res.length !== 0){         
          this.chat = res[0];
          this.msgList = this.chat.messages;
          this.chatId = this.chat.did;
        }
      });

  }

  sendMsg(){

      let x = new Date();
      let date = x.toDateString().toString();
      let time = x.getHours()+":"+x.getMinutes();
      let data = {uid: this.userId, message: this.newMsg, time: `${date}, ${time}`};
      this.newMsg = '';
      this.chat.messages.push(data);
      this.api.updateChat(this.chatId,this.chat);
  }

}
