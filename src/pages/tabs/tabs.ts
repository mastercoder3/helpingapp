import { Component } from '@angular/core';

import { RequestsPage } from '../requests/requests';
import { NotificatinonsPage } from '../notificatinons/notificatinons';
import { HomePage } from '../home/home';
import { AccountPage } from '../account/account';
import { ChatPage } from '../chat/chat';

import { FcmProvider } from '../../providers/fcm/fcm';

import { ToastController, Platform } from 'ionic-angular';
import { Subject } from 'rxjs/Subject';
import { tap } from 'rxjs/operators';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = RequestsPage;
  // tab2Root = NotificatinonsPage;
  tab3Root = HomePage;
  tab4Root = AccountPage;
  tab5Root = ChatPage;

  constructor(platform: Platform, fcm: FcmProvider, toastCtrl: ToastController) {

    platform.ready().then(() => {

      // Get a FCM token
      fcm.getToken(localStorage.getItem('uid'))

      // Listen to incoming messages
      fcm.listenToNotifications().pipe(
        tap(msg => {
          // show a toast
          const toast = toastCtrl.create({
            message: msg.body,
            duration: 3000
          });
          toast.present();
        })
      )
      .subscribe()
    });

  }
}
