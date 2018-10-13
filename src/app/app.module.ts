import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { BarRatingModule } from "ngx-bar-rating";

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
 import {PostPage} from '../pages/post/post';

import {SigninPage as workersignin} from '../pages/provider/signin/signin';
import {SignupPage as workersignup} from '../pages/provider/signup/signup';
import {TabsPage as workertabs} from '../pages/provider/tabs/tabs';
import {RequestsPage as workerrequestpage} from '../pages/provider/requests/requests';
import { NotificationsPage as workernotification} from '../pages/provider/notifications/notifications';
import { AboutusPage } from '../pages/provider/aboutus/aboutus';
import { AccountPage as workeraccount} from '../pages/provider/account/account';
import { AllreviewPage } from '../pages/provider/allreview/allreview';
import { BookingPage as workerbooking} from '../pages/provider/booking/booking';
import { ChatscreenPage as workerchat } from '../pages/provider/chatscreen/chatscreen';
import { ChatslistPage } from '../pages/provider/chatslist/chatslist';
import { ConatctusPage } from '../pages/provider/conatctus/conatctus';
import { ForgotpasswordPage as workerforgotpassword } from '../pages/provider/forgotpassword/forgotpassword';
import { MyprofilePage } from '../pages/provider/myprofile/myprofile';
import { PackagesPage } from '../pages/provider/packages/packages';
import { PurchaseplanPage } from '../pages/provider/purchaseplan/purchaseplan';
import { ReviewPage } from '../pages/provider/review/review';
import { SelectservicePage } from '../pages/provider/selectservice/selectservice';
import { Camera } from '@ionic-native/camera';

//Firebase
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { ApiProvider } from '../providers/api/api';
import { HelperProvider } from '../providers/helper/helper';
import { FcmProvider } from '../providers/fcm/fcm';
import { Firebase } from '@ionic-native/firebase';
import { Facebook } from '@ionic-native/facebook'
import { AndroidPermissions } from '@ionic-native/android-permissions';
import { JobsPage } from '../pages/provider/jobs/jobs';
import { JobInformationPage } from '../pages/provider/jobinformation/jobinformation';
import { ModalPage } from '../pages/provider/modalPage/modalPage';

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
    workersignin,
    workersignup,
    workertabs,
    workerrequestpage,
    workernotification,
    AboutusPage,
    PackagesPage,
    PurchaseplanPage,
    ReviewPage,
    SelectservicePage,
    workeraccount,
    workerbooking,
    workerchat,
    workerforgotpassword,
    AllreviewPage,
    ChatslistPage,
    ConatctusPage,
    MyprofilePage,
    PostPage,
    JobsPage,
    JobInformationPage,
    ModalPage

  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(firebase),
    AngularFirestoreModule,
    AngularFireStorageModule,
    AngularFireAuthModule,
    BarRatingModule
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
    TabsPage,
    workersignin,
    workersignup,
    workertabs,
    workerrequestpage,
    workernotification,
    AboutusPage,
    PackagesPage,
    PurchaseplanPage,
    ReviewPage,
    SelectservicePage,
    workeraccount,
    workerbooking,
    workerchat,
    workerforgotpassword,
    AllreviewPage,
    ChatslistPage,
    ConatctusPage,
    MyprofilePage,
    PostPage,
    JobsPage,
    JobInformationPage,
    ModalPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    AuthProvider,
    ApiProvider,
    HelperProvider,
    AuthProvider,
    FcmProvider,
    Firebase,
    Facebook,
    Camera,
    AndroidPermissions
    ]
})
export class AppModule {}
