import { Component, OnInit } from '@angular/core';
import { NavController } from 'ionic-angular';
import { FormGroup , Validators, FormBuilder} from '@angular/forms';
import {map} from 'rxjs/operators';

 import { TabsPage } from '../tabs/tabs';
 import { ForgotpasswordPage } from '../forgotpassword/forgotpassword';
import { ApiProvider } from '../../../providers/api/api';
import { AuthProvider } from '../../../providers/auth/auth';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { AndroidPermissions } from '@ionic-native/android-permissions';
import { HelperProvider } from '../../../providers/helper/helper';
import { AngularFireStorage,  AngularFireStorageReference, AngularFireUploadTask } from '@angular/fire/storage';
import { finalize } from 'rxjs/operators'
import { Observable } from 'rxjs';

@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html'
})
export class SignupPage implements OnInit {

  categories;
  categoryId;
  form: FormGroup;
  base64Image;
  sourcex;
  uploadProgress: Observable<number>;
  downloadURL: Observable<any>;
  ref: AngularFireStorageReference;
  task: AngularFireUploadTask;
  image;
  data;
  uploadImageId;

  constructor(public navCtrl: NavController,
    private fb: FormBuilder,
    private api: ApiProvider,
    private auth: AuthProvider,
    private camera: Camera,
    private fireStorage: AngularFireStorage,
    private androidPermissions: AndroidPermissions,
    private helper: HelperProvider
    ) {
      this.androidPermissions.checkPermission(this.androidPermissions.PERMISSION.CAMERA).then(
        success => console.log('Permission granted'),
        err => this.androidPermissions.requestPermissions([this.androidPermissions.PERMISSION.CAMERA,this.androidPermissions.PERMISSION.READ_EXTERNAL_STORAGE])
      ).catch(err=> console.log(`cordova error`))
  }

  ngOnInit(){
    this.form = this.fb.group({
      email: ['', Validators.compose([
        Validators.email, Validators.required
      ])],
      age: ['', Validators.required],
      phone: ['', Validators.compose([
        Validators.required, Validators.minLength(9)
      ])],
      firstName: ['', Validators.compose([Validators.required, Validators.minLength(5)])],
      password: ['', Validators.compose([
        Validators.required,
        Validators.minLength(6)
      ])],
      jobTitle: ['',Validators.required],
      categoryName: ['',Validators.required],
      rate: ['', Validators.required],
      city: ['', Validators.required],
      detail: ['', Validators.compose([
        Validators.required,
        Validators.minLength(10)
      ])]
    });
    this.getData();
  }

  get f() { return this.form.controls; }

  getData(){
    this.api.getCategories()
      .pipe(map(actions => actions.map(a  => {
        const data = a.payload.doc.data();
        const did = a.payload.doc.id;
        return {did, ...data};
      })))
      .subscribe(res => {
        this.categories = res;
      })
  }

  onChange(event){
    this.categories.forEach(a => {
      if(a.name === event){
        this.categoryId = a.did;
      }
    });
  }

  submit(form){
    if(this.base64Image === ''){
      this.helper.presentToast('Please Choose an Image to Continue.');
    }
    else {
      this.data = {
        email: form.value.email,
        password: form.value.password,
        firstName: form.value.firstName,
        age: form.value.age,
        phone: form.value.phone,
        categoryName: form.value.categoryName,
        jobTitle: form.value.jobTitle,
        rate: form.value.rate,
        detail: form.value.detail,
        categoryId: this.categoryId,
        status: true,
        imageURL: '',
        city: form.value.city
       }
       this.auth.signup(this.data.email, this.data.password)
       .then(res => {
         this.uploadImageId = res.user.uid;
        this.upload();
       }, err => {
         this.helper.presentToast(err.message);
       })

    }

    
  }

  
tabs(){
   this.navCtrl.push(TabsPage);
   }
   
forgotpassword(){
   this.navCtrl.push(ForgotpasswordPage);
   }

   create(){
      this.api.createUserWorker(this.uploadImageId, this.data)
        .then(response => {
          this.helper.closeLoading();
          localStorage.setItem('wid',this.uploadImageId);
          this.navCtrl.pop();
          this.helper.presentToast('Account Created. Sigin to continue.');
        }, error => {
          this.helper.presentToast(error.message);
        })
   }

   upload(){
    this.helper.presentLoadingDefault();
    this.ref = this.fireStorage.ref(`users/${this.uploadImageId}`);
    let task = this.ref.putString(this.base64Image, 'data_url');
     task.snapshotChanges() 
     .pipe(finalize(() => {
       this.ref.getDownloadURL().subscribe(url => {
         this.image = url;
         if(this.image != ''){
           this.data.imageURL = this.image;
           this.create();
         }
       });
     })).subscribe();      

  }



   takePhoto(source){
    if(source === 'camera'){
      this.sourcex =this.camera.PictureSourceType.CAMERA;
      
    }else if(source === 'library'){
      this.sourcex =this.camera.PictureSourceType.PHOTOLIBRARY;

    }
    
      const options: CameraOptions = {
        sourceType: this.sourcex,
        quality: 100,
        destinationType: this.camera.DestinationType.DATA_URL,
        encodingType: this.camera.EncodingType.JPEG,
        mediaType: this.camera.MediaType.PICTURE
      }

      this.camera.getPicture(options).then((imageData) => {

      this.base64Image = 'data:image/jpeg;base64,' + imageData;
 
      }, (err) => {
      // Handle error
      console.log(err);
      });
  }


}
