import { Component, OnInit } from '@angular/core';
import { NavController } from 'ionic-angular';
import { ApiProvider } from '../../providers/api/api';
import {map} from 'rxjs/operators';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { AndroidPermissions } from '@ionic-native/android-permissions';
import { HelperProvider } from '../../providers/helper/helper';
import { AngularFireStorage,  AngularFireStorageReference, AngularFireUploadTask } from '@angular/fire/storage';
import { finalize } from 'rxjs/operators'
import { Observable } from 'rxjs';


@Component({
  selector: 'page-post',
  templateUrl: 'post.html'
})
export class PostPage implements OnInit {

  categories;
  selected;
  categoryId;
  post = {
    desc: '',
    category: '',
    categoryId: '',
    serviceType: '',
    date: '',
    time: '',
    address: '',
    city: '',
    postImage: ''
    ,status:'',
    customerName:'',
    customerId:'',
    customerImage:''
  }
  base64Image;
  sourcex;
  uploadProgress: Observable<number>;
  downloadURL: Observable<any>;
  ref: AngularFireStorageReference;
  task: AngularFireUploadTask;
  customer;
  uploadImageId;

  constructor(public navCtrl: NavController, private api: ApiProvider, private camera: Camera,  private fireStorage: AngularFireStorage,
     private androidPermissions: AndroidPermissions, private helper: HelperProvider) {
    this.androidPermissions.checkPermission(this.androidPermissions.PERMISSION.CAMERA).then(
      success => console.log('Permission granted'),
      err => this.androidPermissions.requestPermissions([this.androidPermissions.PERMISSION.CAMERA,this.androidPermissions.PERMISSION.READ_EXTERNAL_STORAGE])
    ).catch(err=> console.log(`cordova error`))
   } 

  ngOnInit(){
    this.getData();
    this.uploadImageId = Math.floor(Date.now() / 1000);
  }

  getData(){
    this.api.getCategories()
    .pipe(map(actions => actions.map(a  => {
      const data = a.payload.doc.data();
      const did = a.payload.doc.id;
      return {did, ...data};
    })))
    .subscribe(res => {
      this.categories = res;
      this.selected = this.categories[0].name;
      this.post.category = this.selected;
      this.post.categoryId = this.categories[0].did;
    });

    this.api.getUserData(localStorage.getItem('uid'))
      .pipe(map(actions => {
        const data = actions.payload.data();
        const did = actions.payload.id;
        return {did, ...data};
      }))
      .subscribe(res =>{
        this.customer = res;
        this.post.customerId = this.customer.did;
        this.post.customerName = this.customer.name;
        this.post.customerImage = this.customer.imageURL;
      });
  }

  onChange(event){
    this.categories.forEach(a => {
      if(a.name === event){
        this.categoryId = a.did;
        this.post.category = this.selected;
        this.post.categoryId = this.categoryId;
      }
    });
  }

  async submit(){
     if(this.post.desc != '' && this.post.date != '' && this.post.time != '', this.post.address != ''
        && this.post.serviceType != '' && this.post.city != '' && this.post.category != '' && this.base64Image != ''
     ){
         this.upload();
          

          
     }
     else{
      this.helper.presentToast("Please fill the fields correctly!");
     }
  }

   upload(){
    this.helper.presentLoadingDefault();
    this.ref = this.fireStorage.ref(`posts/${this.uploadImageId}`);
    let task = this.ref.putString(this.base64Image, 'data_url');
    let uploadprogress = task.percentageChanges();
     task.snapshotChanges() 
     .pipe(finalize(() => {
       this.ref.getDownloadURL().subscribe(url => {
         this.post.postImage = url;
         if(this.post.postImage != ''){
           this.create();
         }
       });
     })).subscribe();      

  }

   create(){
    if( this.post.postImage != ''){
      this.helper.closeLoading();
      this.post.status = "inactive";
      this.api.createNewPost(this.post)
      .then(response => {
        this.helper.presentToast('Post Submitted! Once admin will accept your post it will be show to others.');
        this.navCtrl.pop();
      }, err => {
        this.helper.presentToast(err.message);
      })
    }
   
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
     // this.post.postImage = this.base64Image;
  

      }, (err) => {
      // Handle error
      console.log(err);
      });
  }




}
