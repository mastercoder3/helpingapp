import { Injectable } from '@angular/core';
import { AlertController, LoadingController } from 'ionic-angular';
import { ToastController } from 'ionic-angular';

/*
  Generated class for the HelperProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class HelperProvider {

  loading;

  constructor(private alertController: AlertController,private toastCtrl: ToastController, private loadingCtrl: LoadingController) {
  }

  showPrompt(title,msg,i1,n1,i2,n2,i3,n3,myfunc) {
    const prompt = this.alertController.create({
      title: title,
      message: msg,
      inputs: [
        {
          name: i1,
          placeholder: n1
        },
        {
          name: i2,
          placeholder: n2
        },
        {
          name: i3,
          placeholder: n3
        },
      ],
      buttons: [
        {
          text: 'Cancel',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Save',
          handler: myfunc
        }
      ]
    });
    prompt.present();
  }

  presentToast(msg) {
    let toast = this.toastCtrl.create({
      message: msg,
      duration: 3000,
      position: 'bottom'
    });
  
    toast.onDidDismiss(() => {
      console.log('Dismissed toast');
    });
  
    toast.present();
  }

  presentLoadingDefault() {
     this.loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });
  
    this.loading.present();

  }

  closeLoading(){
    this.loading.dismiss();
  }
  
  


}
