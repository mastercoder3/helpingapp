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

  updateUser(id,data){
    return this.afs.doc('customers/'+id).update(data);
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

  updateWorker(id,data){
    return this.afs.doc('worker/'+id).update(data);
  }

  // ::::::::::::::::::::::::::::: Posts/Orders ::::::::::::::::::::::::::::::::::::::::

  createPost(data){
    return this.afs.collection('posts').add(data);
  }

  getPosts(id){
    return this.afs.collection('posts', ref => ref.where('customerId','==',id).where('status','==','active')).snapshotChanges();
  }

  getCompletedPosts(id){
    return this.afs.collection('posts', ref => ref.where('customerId','==',id).where('postStatus','==','completed')).snapshotChanges();
  }

  getCompletedPosts2(id){
    return this.afs.collection('posts', ref => ref.where('workerId','==',id).where('postStatus','==','completed')).snapshotChanges();
  }

  getBooking(id){
    return this.afs.doc('posts/'+id).snapshotChanges();
  }

  updatePost(id,data){
    return this.afs.doc('posts/'+id).update(data);
  }

  // ::::::::::::::::::::::::::::::::::::::::::::: Provider ::::::::::::::::::::::::::::::::::::::::::::::::::::::

  createUserWorker(id, data){
    return this.afs.doc('workers/'+id).set(data);
  }

  getNewPosts(id){
    return this.afs.collection('posts', ref => ref.where('workerId','==',id).where('postStatus','==','pending')).snapshotChanges();
  }

  getCurrentPosts(id){
    return this.afs.collection('posts', ref => ref.where('workerId','==',id).where('postStatus','==','accepted')).snapshotChanges();
  }

  // ::::::::::::::::::::::::::::::::::::::::: Review ::::::::::::::::::::::::::::::::::::::::::::::::::

  createReview(data){
    return this.afs.collection('review').add(data);
  }

  getReview(id){
    return this.afs.collection('review', ref => ref.where('workerId','==',id)).snapshotChanges();
  }


}
