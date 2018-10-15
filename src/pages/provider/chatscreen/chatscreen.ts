import { Component, OnInit, ViewChild } from '@angular/core';
import { NavController, NavParams, Content } from 'ionic-angular';
import { ApiProvider } from '../../../providers/api/api';
import {map} from 'rxjs/operators';
import { HelperProvider } from '../../../providers/helper/helper';

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
  @ViewChild(Content) content: Content;

  constructor(public navCtrl: NavController, private navParams: NavParams, private api: ApiProvider, private helper: HelperProvider) {
    this.senderId = this.navParams.get('senderId');
    this.senderName = this.navParams.get('name');
    this.image = this.navParams.get('image');
    this.userId = localStorage.getItem('wid');

  }

  ngOnInit(){
    this.helper.presentLoadingDefault();
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
        this.scrolltoBottom();
      });
  }

  checkPreviousMessages(id){
    this.api.checkChatIfExistsWorker(this.userId,id)
      .pipe(map(actions => actions.map(a => {
        const data = a.payload.doc.data();
        const did = a.payload.doc.id;
        return {did, ...data};
      })))
      .subscribe(res => {
        this.helper.closeLoading();
        if(res.length !== 0){         
          this.chat = res[0];
          this.msgList = this.chat.messages;
          this.chatId = this.chat.did;
          this.scrolltoBottom();
          
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
  
  ionViewDidLoad(){
    this.getData( this.getData(this.userId));

  }

  scrolltoBottom() {
     this.content.scrollToBottom();

  }

}
