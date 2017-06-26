import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, AlertController } from 'ionic-angular';
import { FireAuth } from '../../providers/fire-auth';
import { ChatList } from '../chat-list/chat-list';
import { Register } from '../register/register';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class Login {
 error:string; 

  constructor(
    public navCtrl: NavController,
     public navParams: NavParams,
      public myAuth: FireAuth,
       public load: LoadingController,
        public alertCtrl: AlertController
     ) {
  }

  ionViewDidLoad() {
    //console.log('ionViewDidLoad Login');
  }
  Login1(email,pass){
    let loading = this.load.create({
      content:'Please wait...',
      dismissOnPageChange:true,
      enableBackdropDismiss:true
    });
    loading.present().then(()=>{
      this.myAuth.CredLogin(email,pass).then(()=>{
      localStorage.setItem('loggedIn','true');
      localStorage.setItem('user',email);
      this.myAuth.MyAuth.authState.subscribe((data)=>{
         if(data.email == email){
           localStorage.setItem('uid',data.uid);
           this.navCtrl.setRoot(ChatList);
         }
       })
     })
    }).catch((err)=>{
        loading.dismiss();
        if(err){
         let alert = this.alertCtrl.create({
          title:'Cannot Login',
          subTitle:'Either Username or Password is incorrect'
         }); 
         alert.present(); 
        }
    });
  }
  register(){
    this.navCtrl.push(Register);
  }
  reset(email){
    if(email != undefined){
          this.myAuth.MyAuth.auth.sendPasswordResetEmail(email).then(()=>{
             let alert = this.alertCtrl.create({
                title: 'PAssword Reset Link has been sent',
                subTitle:'Follow the link to change your password'
              })
              alert.present();
          }).catch((err)=>{
          console.log(err);
          let alert = this.alertCtrl.create({
          title: 'Invalid Attempt',
          subTitle: err.message
        })
        alert.present();
        })
        }
    else{
      let alert = this.alertCtrl.create({
      subTitle:'Please enter your email in Username field and then click Forgot Password'
    })
    alert.present();
    }
  }
}
