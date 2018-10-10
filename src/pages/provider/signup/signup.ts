import { Component, OnInit } from '@angular/core';
import { NavController } from 'ionic-angular';
import { FormGroup , Validators, FormBuilder} from '@angular/forms';
import {map} from 'rxjs/operators';

 import { TabsPage } from '../tabs/tabs';
 import { ForgotpasswordPage } from '../forgotpassword/forgotpassword';
import { ApiProvider } from '../../../providers/api/api';
import { AuthProvider } from '../../../providers/auth/auth';
@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html'
})
export class SignupPage implements OnInit {

  categories;
  categoryId;
  form: FormGroup;

  constructor(public navCtrl: NavController,
    private fb: FormBuilder,
    private api: ApiProvider,
    private auth: AuthProvider
    ) {

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
   let data = {
     email: form.value.email,
     password: form.value.password,
     firstName: form.value.firstName,
     age: form.value.age,
     phone: form.value.phone,
     categoryName: form.value.categoryName,
     jobTitle: form.value.jobTitle,
     rate: form.value.rate,
     detail: form.value.detail,
     categoryId: this.categoryId
    }

    this.auth.signup(data.email, data.password)
      .then(res => {
        this.api.createUserWorker(res.user.uid, data)
          .then(response => {
            localStorage.setItem('wid',res.user.uid);
            this.navCtrl.pop();
          }, error => {
            console.log(error.message);
          })
      },err => {
        console.log(err.message);
      })
    
  }

  
tabs(){
   this.navCtrl.push(TabsPage);
   }
   
forgotpassword(){
   this.navCtrl.push(ForgotpasswordPage);
   }


}
