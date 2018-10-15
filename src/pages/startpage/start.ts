import { Component, OnInit } from '@angular/core';
import { NavController } from 'ionic-angular';
import {FormGroup, FormBuilder, Validators} from '@angular/forms';

import { SignupPage as workerSignup } from '../provider/signup/signup';
import {TabsPage as workerHome}  from '../provider/tabs/tabs';
import { AuthProvider } from '../../providers/auth/auth';
import { ApiProvider } from '../../providers/api/api';
import { HelperProvider } from '../../providers/helper/helper';
import { TabsPage } from '../tabs/tabs';
import * as firebase from 'firebase';
import { SignupPage } from '../signup/signup';



@Component({
  selector: 'page-start',
  templateUrl: 'start.html'
})
export class StartPage implements OnInit{

  type: string = 'worker';

  form: FormGroup;
  form1: FormGroup;
  user;
  facebook;
  image: string = '';

  constructor(public navCtrl: NavController,
    private api: ApiProvider,
    private auth: AuthProvider,
    private helper: HelperProvider,
    private fb: FormBuilder
    ){
      this.helper.presentLoadingDefault();
    if(localStorage.getItem('wid')){
      this.navCtrl.setRoot(workerHome);
      this.helper.closeLoading();
    }
    else if(localStorage.getItem('uid')){
      this.navCtrl.setRoot(TabsPage);
      this.helper.closeLoading();
    }
    else{
      this.helper.closeLoading();
    }
    this.type = 'worker';
   }


   ngOnInit(){
    this.form = this.fb.group({
      email: ['', Validators.compose([Validators.email, Validators.required])],
      password: ['', Validators.required]
    });
    this.form1 = this.fb.group({
      email: ['', Validators.compose([Validators.email, Validators.required])],
      password: ['', Validators.required]
    });
  }  

  get f() { return this.form.controls; }

signin(form){
  let email = form.value.email;
  let password = form.value.password;
  if( email !== '' && password !== '' ){
    this.helper.presentLoadingDefault();
    this.auth.login(email, password)
      .then(res => {
        if(res.user.emailVerified === true){
          this.auth.setPersistance().then( () => {
            this.helper.closeLoading();
            localStorage.setItem('wid', res.user.uid);
            this.navCtrl.setRoot(workerHome);
          })
        }
        else if (res.user.emailVerified === false) {
          this.helper.closeLoading();
          this.helper.showAlertWithoutInput('Email verification','Email verification Required!','Resend Email',()=>{
            //on success
            this.resend();
          });
        }

      }, err => {
        this.helper.closeLoading();
        this.helper.presentToast(err.message);
      });
  }
  else {
    this.helper.presentToast('Please Provide Email and Password.')
  }
}

signinCustomer(form){
  let email = form.value.email;
  let password = form.value.password;
  if( email !== '' && password !== '' ){
    this.helper.presentLoadingDefault();
    this.auth.login(email, password)
      .then(res => {
        if(res.user.emailVerified === true){
          this.auth.setPersistance().then( () => {
            this.api.checkUser(email,password)
              .subscribe(resp => {
                if(resp.length === 0){
                  this.helper.closeLoading();
                  this.helper.presentToast('User Not Found. Signup to continue.');
                }
                else if (resp.length !== 0){
                  this.helper.closeLoading();
                  localStorage.setItem('uid', res.user.uid);
                  this.navCtrl.push(TabsPage);
                }
              })
          });
        }
        else if (res.user.emailVerified === false) {
          this.helper.closeLoading();
          this.helper.showAlertWithoutInput('Email verification','Email verification Required!','Resend Email',()=>{
            //on success
            this.resend();
          });
        }

      }, err => {
        this.helper.closeLoading();
        this.helper.presentToast(err.message);
      });
  }
  else {
    this.helper.presentToast('Please Provide Email and Password.')
  }
}

resend(){
  this.auth.sendVerificationEmail()
    .then(data =>{
      this.helper.presentToast('Email Sent! Check your inbox.');

    }, err=>{
      this.helper.presentToast(`Error Sending Email. ${err.message}`);
    });
}


signup(){
  if(this.type === 'worker')
      this.navCtrl.push(workerSignup);
  if(this.type === 'customer')
      this.navCtrl.push(SignupPage);
 }

 forgotPassword(){
  let myFunct = (res) => {
    if(this.type === 'customer'){
      this.api.checkUserSiginMethod(res.email)
      .subscribe(data => {
        if(data.length !== 0){
          this.auth.forgotPassword(res.email)
          .then(res => {
            this.helper.presentToast('Check your Inbox for Password Reset Email.');
          }, err => {
            this.helper.presentToast(err.message);
          })
        }
        else{
          this.helper.presentToast('Cannot Find User.');
        }
      });

    }
    else if(this.type === 'worker'){
      this.auth.forgotPassword(res.email)
      .then(res => {
        this.helper.presentToast('Check your Inbox for Password Reset Email.');
      }, err => {
        this.helper.presentToast(err.message);
      })
    }


 };
this.helper.showPromptSignle('Reset Password','Email is required in order to recieve reset password email','email','Your Email',myFunct,'Save');
 }

 facebookSignin(){
  this.auth.facebookLogin()
    .then(ress => {
      const provider = firebase.auth.FacebookAuthProvider
      .credential(ress.authResponse.accessToken);

      this.auth.facebookSignin(provider)
      .then(res => {
        this.facebook = res;
        let id = this.facebook.user.uid;
        this.helper.presentToast(id);
        let isNewUser = this.facebook.additionalUserInfo.isNewUser;
        if(isNewUser === false){
          localStorage.setItem('uid',this.facebook.user.uid);
          this.navCtrl.push(TabsPage);
        }
        else if(isNewUser === true){
          //data 
          this.user.firstName = this.facebook.additionalUserInfo.profile.first_name;
          this.user.email =  this.facebook.additionalUserInfo.profile.email;
          this.user.lastName =  this.facebook.additionalUserInfo.profile.last_name;
          this.user.imageURL =  this.facebook.additionalUserInfo.profile.picture.data.url;
          this.user.name = this.facebook.additionalUserInfo.profile.name;
          this.user.signinMethod = 'facebook';
          //creating user in the database
          this.api.createUser(this.facebook.user.uid, this.user)
            .then(response => {
              localStorage.setItem('uid',this.facebook.user.uid);
              this.navCtrl.setRoot(TabsPage);
            }, err => {
              console.log(err);
            })

        }
      },err =>{
        console.log(err)
      })



    })
 
}



}
