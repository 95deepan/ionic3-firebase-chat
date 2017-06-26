import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { HttpModule } from '@angular/http';
import { MyApp } from './app.component';
import { Storage } from '@ionic/storage';
import { SuperTabsModule } from 'ionic2-super-tabs';

//  Backend
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';

//pages
import { Login } from '../pages/login/login';
import { Register } from '../pages/register/register';
import { Chat } from '../pages/chat/chat';
import { ChatList } from '../pages/chat-list/chat-list';
import { Popover } from '../pages/popover/popover';
import { Pop2 } from '../pages/pop2/pop2';

//providers
import { FireAuth } from '../providers/fire-auth';

// Native Plugins
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Camera } from '@ionic-native/camera';

export function provideStorage() {
   return new Storage();
 } 

export const firebaseConfig = {
      apiKey: "<API_KEY>",
      authDomain: "<PROJECT_ID>.firebaseapp.com",
      databaseURL: "https://<DATABASE_NAME>.firebaseio.com",
      storageBucket: "<BUCKET>.appspot.com",
      messagingSenderId: "<SENDER_ID>"
};


@NgModule({
  declarations: [
    MyApp,
    Login,
    Register,
    Chat,
    ChatList,
    Popover,
    Pop2
  ],
  imports: [
    HttpModule,
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    SuperTabsModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    Login,
    Register,
    Chat,
    ChatList,
    Popover,
    Pop2
  ],
  providers: [
    StatusBar,
    SplashScreen,
    FireAuth,
    Camera,
    {provide: Storage, useFactory: provideStorage},
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
