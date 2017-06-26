import { Component } from '@angular/core';
import { IonicPage,ViewController } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-pop2',
  templateUrl: 'pop2.html',
})
export class Pop2 {

  constructor(public viewCtrl: ViewController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Pop2');
  } 
  close(data){
    this.viewCtrl.dismiss(data);
  }
}
