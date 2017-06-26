import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { AlertController } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth'

@Injectable()
export class FireAuth {

  UserEmail:string;

  constructor(
    public http: Http,
    public MyAuth:AngularFireAuth,
    public alrtCrl: AlertController
    ) {
   // console.log('Hello FireAuth Provider');
  }
  
  CredLogin(email,pass){
    return this.MyAuth.auth.signInWithEmailAndPassword(email,pass).then((data)=>{
        this.UserEmail = email;
    }).catch((err)=>{
      console.log(err);
    })
  }

  CreateUser(email,pass){
    return this.MyAuth.auth.createUserWithEmailAndPassword(email,pass);
  }

}
