import { Injectable } from '@angular/core';
import {AngularFirestore} from '@angular/fire/firestore';
/*
  Generated class for the ApiProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ApiProvider {

  constructor(private afs: AngularFirestore) {    
  }

  createUser(uid,data){
    return this.afs.doc('customers/'+uid).set(data);
  }

  getUserData(id){
    return this.afs.doc('customers/'+id).snapshotChanges();
  }



  // :::::::::::::::::::::::::::::::::::::: Categories ::::::::::::::::::::::::::::::::::::::::::::

  getCategories(){
    return this.afs.collection('category').snapshotChanges();
  }

  getSubCategorie(id){
    return this.afs.collection('subCategory', ref => ref.where('categoryId','==',id)).snapshotChanges();
  }

  // ::::::::::::::::::::::::::::: get Workers ::::::::::::::::::::::::::::::::::::::::::

  getWorkers(id){
    return this.afs.collection('workers', ref => ref.where('categoryId','==',id)).snapshotChanges();
  }

  getWorkerProfile(id){
    return this.afs.doc('workers/'+id).snapshotChanges();
  }

  // ::::::::::::::::::::::::::::: Posts/Orders ::::::::::::::::::::::::::::::::::::::::

  createPost(data){
    return this.afs.collection('posts').add(data);
  }

  getPosts(id){
    return this.afs.collection('posts', ref => ref.where('customerId','==',id).where('status','==','active')).snapshotChanges();
  }

  getBooking(id){
    return this.afs.doc('posts/'+id).snapshotChanges();
  }

}
