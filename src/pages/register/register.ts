import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController,AlertController } from 'ionic-angular';
import { FireAuth } from '../../providers/fire-auth';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { Login } from '../login/login';

@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class Register {
  Users:FirebaseListObservable<any>;
  name:string;
  email:string;
  pass:string;
  uid:any;
  constructor(
    public navCtrl: NavController,
     public navParams: NavParams,
      public myAuth: FireAuth,
       public afDB: AngularFireDatabase,
        public load:LoadingController,
         public alertCtrl: AlertController
     ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Register');
    this.Users= this.afDB.list('/users');
  }
  signup(name,email,pass){
     let loading = this.load.create({
        content:'Please wait...',
        dismissOnPageChange:true,
     });
     loading.present().then(()=>{
       this.myAuth.CreateUser(email,pass).then(()=>{
       this.myAuth.MyAuth.authState.subscribe((data)=>{
         //console.log("data  is ",data.uid);
         if(data.email == email){
           this.Users.push({
            username:name,
            email:email,
            pass:pass,
            uid:data.uid
          }).then(()=>{
            this.navCtrl.setRoot(Login);
          });
         }
       });  
     })
     })
     .catch((err)=>{
            loading.dismiss();
           if(err){
              let alert = this.alertCtrl.create({
                title:'Cannot Register',
                subTitle:'Invalid Credentials'
              }); 
              alert.present(); 
              }
            });
            this.name="";
            this.email="";
            this.pass="";
      }
 }
