import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, AlertController,PopoverController } from 'ionic-angular';
import { FireAuth } from '../../providers/fire-auth';
import { AngularFireDatabase,FirebaseListObservable } from 'angularfire2/database';
import { Login } from '../login/login';
import { Chat } from '../chat/chat';
import { Pop2 } from '../pop2/pop2';

@IonicPage()
@Component({
  selector: 'page-chat-list',
  templateUrl: 'chat-list.html',
})
export class ChatList {
  page1: any = Chat;
  page2: any = Login;
  
  user1user2:any;
  user2user1:any;

  users:FirebaseListObservable<any>;
  chat:FirebaseListObservable<any>;
  me:any;
  uid:any;
  branches:any[];

  wait1:boolean = false;
  wait2:boolean = false;
  wait3:boolean = false;

  constructor(
    public navCtrl: NavController,
     public navParams: NavParams,
      public myAuth: FireAuth,
       public db:AngularFireDatabase,
        public loadCtrl: LoadingController,
         public alertCtrl: AlertController,
          public popoverCtrl: PopoverController
     ) {

  } 
  pop(myEvent){
    let popover = this.popoverCtrl.create(Pop2);
      popover.present({
        ev: myEvent
      });
    popover.onDidDismiss((data)=>{
      if(data=='logout'){
        let prompt = this.alertCtrl.create({
          title:'Are you sure you want to logout?',
          buttons:[
          {
            text:'Cancel',
            handler: data=>{
              console.log("Cancel clicked");}
          },
          {
            text:'Yes',
            handler:data=>{
             this.logout();
           }
          }]
       });
       prompt.present();
      }
    })
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad ChatList');
    this.users = this.db.list('users');
    this.chat = this.db.list('chat/branches');
    this.me = localStorage.getItem('user');
    this.uid = localStorage.getItem('uid');
    this.chat.subscribe(data=>{
       this.branches = [];
       this.branches = data;
     });
  }
  logout(){
    this.myAuth.MyAuth.auth.signOut().then(()=>{
      this.navCtrl.setRoot(Login);
      localStorage.removeItem('loggedIn');
      localStorage.removeItem('user');
      localStorage.removeItem('uid');
    });
  }
  scan(user1,user2){
       
       
      //this.push(user1,user2);
  }
  push(user1,user2){
      
  }
  openchat(name,user1,user2){
     // this.navCtrl.push(Chat,{id1:user1+user2,user:name,id2:user2+user1});
    let loading = this.loadCtrl.create({
      content:'Please wait...',
      dismissOnPageChange:true,
      enableBackdropDismiss:true
    });
    loading.present().then(()=>{
       for(let i=0;i<this.branches.length;i++){
        if(user1+user2 === this.branches[i].users){
         this.user1user2 = user1+user2;
         this.navCtrl.push(Chat,{user:name,id:user1+user2});
         break;
        }
        if(user2+user1 === this.branches[i].users){
         this.user2user1 = user2+user1;
         this.navCtrl.push(Chat,{user:name,id:user2+user1});
         break;
        }
      }
     console.log("After scanning user1user2 is",this.user1user2);
     console.log("After scanning user2user1 is",this.user2user1);
     if(user1+user2 != this.user1user2 && user2+user1 != this.user2user1){
       this.chat.push({
         users:user1+user2
       }).then(()=>{
         this.navCtrl.push(Chat,{user:name,id:user1+user2});
       }).catch((err)=>{
         console.log(err);
       })
     }
    }).catch((err)=>{
      loading.dismiss();
      let alert = this.alertCtrl.create({
        title:'Unable to open chat',
        subTitle:err.message
      });
      alert.present();
    })     
  }
 }
