import { Injectable } from '@angular/core';
import { AlertController, LoadingController, ModalController } from 'ionic-angular';
import { ToastController } from 'ionic-angular';
import { ModalPage } from '../../pages/provider/modalPage/modalPage';

/*
  Generated class for the HelperProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class HelperProvider {

  loading;
  profileModal;

  constructor(private alertController: AlertController,private toastCtrl: ToastController, private loadingCtrl: LoadingController,
    public modalCtrl: ModalController) {
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

  showAlertWithoutInput(header,message,buttonName,myfunc){
    const alert = this.alertController.create({
      title: header,
      message: message,
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            alert.dismiss();
          }
        }, {
          text: buttonName,
          handler: myfunc
        }
      ]
    });

     alert.present();
  }

  showPromptSignle(title,msg,i1,n1,myfunc,btnText) {
    const prompt = this.alertController.create({
      title: title,
      message: msg,
      inputs: [
        {
          name: i1,
          placeholder: n1
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
          text: btnText,
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

  presentImageModal(imageURL) {
    this.profileModal = this.modalCtrl.create(ModalPage, { image: imageURL});
    this.profileModal.present();
  }

  closeModal(){
    this.profileModal.dismiss();
  }
  
  


}
