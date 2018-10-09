import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { AboutPage } from '../pages/about/about';
import { AccountPage } from '../pages/account/account';
import { BookingPage } from '../pages/booking/booking';
import { BooknowPage } from '../pages/booknow/booknow';
import { CategoryPage } from '../pages/category/category';
import { ChatPage } from '../pages/chat/chat';
import { ChatscreenPage } from '../pages/chatscreen/chatscreen';
import { ContactPage } from '../pages/contact/contact';
import { FaqsPage } from '../pages/faqs/faqs';
import { ForgotpasswordPage } from '../pages/forgotpassword/forgotpassword';
import { HomePage } from '../pages/home/home';
import { ListofplumberPage } from '../pages/listofplumber/listofplumber';
import { ManageaddressPage } from '../pages/manageaddress/manageaddress';
import { NotificatinonsPage} from '../pages/notificatinons/notificatinons';
import { PrivacyPage } from '../pages/privacy/privacy';
import { PlumberprofilePage } from '../pages/plumberprofile/plumberprofile';
import { RequestsPage } from '../pages/requests/requests';
import { SignupPage } from '../pages/signup/signup';
import { SigninPage } from '../pages/signin/signin';
import { TabsPage } from '../pages/tabs/tabs';
import {StartPage} from '../pages/startpage/start';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { AuthProvider } from '../providers/auth/auth';

//Firebase
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { ApiProvider } from '../providers/api/api';
import { HelperProvider } from '../providers/helper/helper';

const firebase = {
  apiKey: "AIzaSyAbZplqw7rUDD2Nha-hkNI8-EAHh0J771c",
  authDomain: "handyman-ea0e1.firebaseapp.com",
  databaseURL: "https://handyman-ea0e1.firebaseio.com",
  projectId: "handyman-ea0e1",
  storageBucket: "handyman-ea0e1.appspot.com",
  messagingSenderId: "221396946660"
}

@NgModule({
  declarations: [
    MyApp,
    AboutPage,
    AccountPage,
    BookingPage,
    BooknowPage,
    CategoryPage,
    StartPage,
    ChatPage,
    ChatscreenPage,
    ContactPage,
    FaqsPage,
    ForgotpasswordPage,
    HomePage,
    ListofplumberPage,
    ManageaddressPage,
    NotificatinonsPage,
    PrivacyPage,
    PlumberprofilePage,
    RequestsPage,
    SignupPage,
    SigninPage,
    TabsPage,
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(firebase),
    AngularFirestoreModule,
    AngularFireStorageModule,
    AngularFireAuthModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AboutPage,
    StartPage,
    AccountPage,
    BookingPage,
    BooknowPage,
    CategoryPage,
    ChatPage,
    ChatscreenPage,
    ContactPage,
    FaqsPage,
    ForgotpasswordPage,
    HomePage,
    ListofplumberPage,
    ManageaddressPage,
    NotificatinonsPage,
    PrivacyPage,
    PlumberprofilePage,
    RequestsPage,
    SignupPage,
    SigninPage,
    TabsPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    AuthProvider,
    ApiProvider,
    HelperProvider
  ]
})
export class AppModule {}
