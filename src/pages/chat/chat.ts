import { ViewChild,Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Content, PopoverController,AlertController } from 'ionic-angular';
import { AngularFireDatabase,FirebaseListObservable } from 'angularfire2/database';
import { Popover } from '../popover/popover';

@IonicPage()
@Component({
  selector: 'page-chat',
  templateUrl: 'chat.html',
})
export class Chat {
  name:any;
  id:any;
  message:any;
  time:any;
  chats:FirebaseListObservable<any>;
  @ViewChild(Content) content: Content;
  constructor(
    public navCtrl: NavController,
     public navParams: NavParams,
      public db:AngularFireDatabase,
       public popoverCtrl: PopoverController,
        public alertCtrl: AlertController
      ) {
          this.name = this.navParams.get('user'); 
          this.id = this.navParams.get('id');
          this.chats = this.db.list('chat/'+this.id);
         }
  pop(myEvent){
     let popover = this.popoverCtrl.create(Popover);
      popover.present({
        ev: myEvent
      });
      popover.onDidDismiss((data)=>{
        if(data=='delete'){
        let prompt = this.alertCtrl.create({
          title:'Delete Permanently',
          buttons:[
          {
            text:'Cancel',
            handler: data=>{
              console.log("Cancel clicked");}
          },
          {
            text:'Delete',
            handler:data=>{
              this.chats.remove().then(()=>{
              this.navCtrl.pop();
            });
           }
          }]
       });
       prompt.present();
        }
        if(data=='about'){

        }
      });
  }
  ionViewDidLoad(){
    let dimensions = this.content.getContentDimensions();
    this.content.scrollTo(0, dimensions.scrollHeight+100, 200);
  }
  ionViewDidEnter() {
    let dimensions = this.content.getContentDimensions();
    this.content.scrollTo(0, dimensions.contentHeight+100, 200);
  }
  send(message){
    if(message === "" || message == undefined || message == null){
            return;
      }
      else{
          var now = new Date();
          var hrs = now.getHours();
          var mins = now.getMinutes();
    /*
      Case 1:
        If hrs 0-11 => AM
        else PM (hrs-12)

        if mins 0-9 => prefix "0"
    */
         if(hrs<12){
              if(mins<10 || mins == 0){
                  var time = hrs+":"+"0"+mins+" "+"AM";          
              }
              else{
                  var time = hrs+":"+mins+" "+"AM";     
              }
          }

          if(hrs == 12){
              if(mins<10 || mins == 0){
                  var time = hrs+":"+"0"+mins+" "+"PM";          
              }
              else{
                  var time = hrs+":"+mins+" "+"PM";     
              }
          }

          if(hrs>12){
              hrs=hrs-12;
              if(mins<10 || mins == 0){
                  var time = hrs+":"+"0"+mins+" "+"PM";          
              }
              else{
                  var time = hrs+":"+mins+" "+"PM";     
              }
          }
           this.chats.push({
            message:message,
            user:this.name,
            time:time
          }).then(k=>{
            this.message = "";
            this.content.scrollToBottom(500);
          }).catch((err)=>{
            console.log(err);
            this.content.scrollToBottom(500);
          });
      }
      console.log("scrollToBottom is ",this.content.scrollToBottom(500));      
  }

}
